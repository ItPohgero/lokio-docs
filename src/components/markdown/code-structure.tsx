"use client";
import { ChevronDown, ChevronRight, File, Folder, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface GitHubItem {
	type: string;
	path: string;
	name: string;
}

interface FolderContent {
	[key: string]: GitHubItem[];
}

const CodeStructure = ({
	structure = "next-monolith",
}: { structure: string }) => {
	const [data, setData] = useState<GitHubItem[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [expandedFolders, setExpandedFolders] = useState(new Set([structure]));
	const [folderContents, setFolderContents] = useState<FolderContent>({});
	const [loadingFolders, setLoadingFolders] = useState<Set<string>>(new Set());

	const fetchGitHubContent = useCallback(async (path: string) => {
		try {
			const response = await fetch(
				`https://api.github.com/repos/any-source/examples/contents/${path}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch repository data");
			}
			const result = await response.json();
			return result;
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(err.message);
			}
			throw new Error("An unknown error occurred");
		}
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchInitialContent = async () => {
			try {
				const result = await fetchGitHubContent(`code/${structure}`);
				const manualRootFile: GitHubItem = {
					type: "file",
					path: ".lokio.yaml",
					name: ".lokio.yaml",
				};
				setData([manualRootFile, ...result]);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchInitialContent();
	}, [structure,]);

	const toggleFolder = async (path: string, isFolder: boolean) => {
		if (!isFolder) return;

		const newExpandedFolders = new Set(expandedFolders);
		const isCurrentlyExpanded = newExpandedFolders.has(path);

		if (!(isCurrentlyExpanded || folderContents[path])) {
			setLoadingFolders((prev) => new Set(prev).add(path));
			try {
				const content = await fetchGitHubContent(path);
				setFolderContents((prev) => ({
					...prev,
					[path]: content,
				}));
				newExpandedFolders.add(path);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to fetch folder contents",
				);
			} finally {
				setLoadingFolders((prev) => {
					const newSet = new Set(prev);
					newSet.delete(path);
					return newSet;
				});
			}
		} else {
			if (isCurrentlyExpanded) {
				newExpandedFolders.delete(path);
			} else {
				newExpandedFolders.add(path);
			}
		}

		setExpandedFolders(newExpandedFolders);
	};

	const sortItems = (items: GitHubItem[]) => {
		return [...items].sort((a, b) => {
			// If both are same type, sort alphabetically
			if (
				(a.type === "dir" && b.type === "dir") ||
				(a.type !== "dir" && b.type !== "dir")
			) {
				return a.name.localeCompare(b.name);
			}
			// Folders come first
			return a.type === "dir" ? -1 : 1;
		});
	};

	const renderItem = (item: GitHubItem, level = 0) => {
		const isFolder = item.type === "dir";
		const isExpanded = expandedFolders.has(item.path);
		const isLoading = loadingFolders.has(item.path);
		const paddingLeft = `${level * 20}px`;
		const folderContent = folderContents[item.path];

		return (
			<div key={item.path}>
				<div
					className="flex items-center py-1 hover:bg-secondary cursor-pointer"
					style={{ paddingLeft }}
					onClick={() => toggleFolder(item.path, isFolder)}
					onKeyUp={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							toggleFolder(item.path, isFolder);
						}
					}}
				>
					{isFolder && (
						<span className="mr-1">
							{isLoading ? (
								<Loader2 className="animate-spin h-4 w-4" />
							) : isExpanded ? (
								<ChevronDown size={16} />
							) : (
								<ChevronRight size={16} />
							)}
						</span>
					)}
					{!isFolder && <span className="w-4 mr-1" />}
					{isFolder ? (
						<Folder size={16} className="text-blue-500 mr-2" />
					) : (
						<File size={16} className="text-gray-500 mr-2" />
					)}
					<span
						className={`text-sm ${item.name === ".lokio.yaml" ? "text-primary" : ""}`}
					>
						{item.name}
					</span>
				</div>
				{isFolder && isExpanded && folderContent && (
					<div>
						{sortItems(folderContent).map((childItem: GitHubItem) =>
							renderItem(childItem, level + 1),
						)}
					</div>
				)}
			</div>
		);
	};

	if (loading) {
		return (
			<div className="w-full max-w-2xl border rounded-lg shadow-sm p-8 flex justify-center">
				<Loader2 className="animate-spin h-6 w-6 text-blue-500" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full max-w-2xl border rounded-lg shadow-sm p-4">
				<div className="text-red-500">Error: {error}</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-2xl border rounded-lg shadow-sm my-10">
			<div className="p-4 border-b">
				<div className="text-lg font-semibold">Repository Structure</div>
				<div className="text-sm">{structure}</div>
			</div>
			<div className="p-2">
				{data && sortItems(data).map((item: GitHubItem) => renderItem(item))}
			</div>
		</div>
	);
};

export default CodeStructure;
