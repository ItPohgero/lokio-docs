'use client';
import { ChevronDown, ChevronRight, Folder, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import FileIcon from "../ui/file-icon";

interface GitHubItem {
    type: string;
    path: string;
    name: string;
}

interface FolderContent {
    [key: string]: GitHubItem[];
}

interface GitHubExplorerProps {
    owner: string;          // GitHub repository owner
    repo: string;          // Repository name
    defaultPath?: string;  // Initial path to load
    defaultExpanded?: boolean; // Whether to expand the root folder by default
    className?: string;    // Additional CSS classes
    showHeader?: boolean;  // Option to show/hide the header
    basePath?: string;     // Base path prefix (e.g., "code")
    structure?: string;    // Structure identifier (for specific use cases)
    rootFiles?: GitHubItem[]; // Additional root files to include
    highlightFiles?: string[]; // Files to highlight with primary color
}

const GitHubExplorer = ({
    owner,
    repo,
    defaultPath = "",
    defaultExpanded = true,
    className = "",
    showHeader = true,
    basePath = "",
    structure = "",
    rootFiles = [],
    highlightFiles = [],
}: GitHubExplorerProps) => {
    const [data, setData] = useState<GitHubItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedFolders, setExpandedFolders] = useState(new Set(defaultExpanded ? [structure || defaultPath] : []));
    const [folderContents, setFolderContents] = useState<FolderContent>({});
    const [loadingFolders, setLoadingFolders] = useState<Set<string>>(new Set());

    const fetchGitHubContent = useCallback(async (path: string) => {
        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization' : `Bearer ${process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        };

        try {
            const response = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
                { headers }
            );

            // Extract rate limit information
            const remaining = response.headers.get('x-ratelimit-remaining');
            const resetTime = response.headers.get('x-ratelimit-reset');

            if (remaining === '0' && resetTime) {
                const resetDate = new Date(Number.parseInt(resetTime) * 1000);
                console.error(`Rate limit will reset at ${resetDate}`);                
                throw new Error(`API rate limit exceeded. Resets at ${resetDate.toLocaleString()}`);
            }

            if (!response.ok) {
                if (response.status === 403) {
                    const error = await response.json();
                    throw new Error(error.message || 'Rate limit exceeded');
                }
                throw new Error(`Failed to fetch repository data: ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("An unknown error occurred");
        }
    }, [owner, repo]);

    useEffect(() => {
        const fetchInitialContent = async () => {
            try {
                // Construct the initial path based on provided props
                const initialPath = [basePath, structure, defaultPath]
                    .filter(Boolean)
                    .join('/');

                const result = await fetchGitHubContent(initialPath);

                // Combine root files with the fetched results
                const combinedData = [...rootFiles, ...(Array.isArray(result) ? result : [result])];

                setData(combinedData);
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
    }, [structure, defaultPath, basePath, fetchGitHubContent, rootFiles]);

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
                        : "Failed to fetch folder contents"
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
            if (
                (a.type === "dir" && b.type === "dir") ||
                (a.type !== "dir" && b.type !== "dir")
            ) {
                return a.name.localeCompare(b.name);
            }
            return a.type === "dir" ? -1 : 1;
        });
    };

    const renderItem = (item: GitHubItem, level = 0) => {
        const isFolder = item.type === "dir";
        const isExpanded = expandedFolders.has(item.path);
        const isLoading = loadingFolders.has(item.path);
        const paddingLeft = `${level * 20}px`;
        const folderContent = folderContents[item.path];
        const isHighlighted = highlightFiles.includes(item.name);


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
                        <Folder size={16} className="text-slate-400 mr-2" />
                    ) : (
                        <FileIcon fileName={item.name} className="mx-2" />
                    )}
                    <span className={`text-sm ${isHighlighted ? "text-primary" : ""}`}>
                        {item.name}
                    </span>
                </div>
                {isFolder && isExpanded && folderContent && (
                    <div>
                        {sortItems(folderContent).map((childItem: GitHubItem) =>
                            renderItem(childItem, level + 1)
                        )}
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className={`w-full border rounded-lg shadow-sm p-8 flex justify-center ${className}`}>
                <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={`w-full border rounded-lg shadow-sm p-4 ${className}`}>
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className={`w-full border rounded-lg shadow-sm ${className}`}>
            {showHeader && (
                <div className="p-4 border-b">
                    <div className="text-lg font-semibold">Repository Structure</div>
                    <div className="text-sm">{structure || `${owner}/${repo}`}</div>
                </div>
            )}
            <div className="p-2">
                {data && sortItems(data).map((item: GitHubItem) => renderItem(item))}
            </div>
        </div>
    );
};

export default GitHubExplorer;