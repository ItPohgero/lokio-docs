import type React from 'react';
import {
    FileJson,
    FileCode,
    FileImage,
    FileVideo,
    FileAudio,
    FileArchive,
    FileSpreadsheet,
    FileType,
    File
} from "lucide-react";
import { Icon } from '@iconify/react/dist/iconify.js';

interface FileIconProps {
    fileName: string;
    size?: number;
    className?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ fileName, size = 14, className = "" }) => {
    const getFileExtension = (name: string): string => {
        return name.toLowerCase().split('.').pop() || '';
    };

    const getIconByExtension = (extension: string) => {
        switch (extension) {
            // Configuration files
            case 'gitignore':
                return <Icon icon="vscode-icons:file-type-git" width={size} height={size} className={className} />
            case 'lockb':
                return <Icon icon="vscode-icons:file-type-bun" width={size} height={size} className={className} />
            case 'json':
                return <Icon icon="vscode-icons:file-type-json" width={size} height={size} className={className} />
            case 'yaml':
            case 'yml':
                return <Icon icon="file-icons:yaml-alt4" width={size} height={size} className={className} />
            case 'toml':
                return <Icon icon="vscode-icons:file-type-toml" width={size} height={size} className={className} />
            case 'xml':
                return <Icon icon="vscode-icons:file-type-xml" width={size} height={size} className={className} />
            case 'ini':
                return <FileJson size={size} className={`text-yellow-500 ${className}`} />;

            // Documentation & Text
            case 'md':
            case 'mdx':
                return <Icon icon="vscode-icons:file-type-freemarker" width={size} height={size} className={className} />
            case 'txt':
            case 'doc':
            case 'docx':
                return <Icon icon="vscode-icons:file-type-word" width={size} height={size} className={className} />
            case 'rtf':
            case 'pdf':
                return <Icon icon="vscode-icons:file-type-pdf2" width={size} height={size} className={className} />

            // Programming Languages
            case 'js':
                return <Icon icon="vscode-icons:file-type-js-official" width={size} height={size} className={className} />
            case 'jsx':
                return <Icon icon="vscode-icons:file-type-reacttemplate" width={size} height={size} className={className} />
            case 'ts':
                return <Icon icon="vscode-icons:file-type-typescript-official" width={size} height={size} className={className} />
            case 'tsx':
                return <Icon icon="vscode-icons:file-type-reactts" width={size} height={size} className={className} />
            case 'py':
                return <Icon icon="vscode-icons:file-type-python" width={size} height={size} className={className} />
            case 'java':
                return <Icon icon="vscode-icons:file-type-java" width={size} height={size} className={className} />
            case 'jar':
                return <Icon icon="vscode-icons:file-type-jar" width={size} height={size} className={className} />
            case 'pro':
                return <Icon icon="vscode-icons:file-type-protobuf" width={size} height={size} className={className} />
            case 'cpp':
                return <Icon icon="vscode-icons:file-type-cpp3" width={size} height={size} className={className} />
            case 'c':
            case 'cs':
                return <Icon icon="vscode-icons:file-type-csharp2" width={size} height={size} className={className} />
            case 'php':
                return <Icon icon="vscode-icons:file-type-php3" width={size} height={size} className={className} />
            case 'rb':
                return <Icon icon="vscode-icons:file-type-ruby" width={size} height={size} className={className} />
            case 'go':
                return <Icon icon="vscode-icons:file-type-go" width={size} height={size} className={className} />
            case 'mod':
                return <Icon icon="vscode-icons:file-type-go-fuchsia" width={size} height={size} className={className} />
            case 'sum':
                return <Icon icon="vscode-icons:file-type-go-yellow" width={size} height={size} className={className} />
            case 'rs':
                return <Icon icon="vscode-icons:file-type-light-rust" width={size} height={size} className={className} />
            case 'swift':
                return <Icon icon="vscode-icons:file-type-swift" width={size} height={size} className={className} />
            case 'kt':
                return <Icon icon="vscode-icons:file-type-kotlin" width={size} height={size} className={className} />
            case 'kts':
                return <Icon icon="vscode-icons:file-type-kotlin" width={size} height={size} className={className} />
            case 'properties':
                return <Icon icon="vscode-icons:file-type-gradle" width={size} height={size} className={className} />
            case 'gradlew':
                return <Icon icon="vscode-icons:file-type-light-gradle" width={size} height={size} className={className} />
            case 'dart':
                return <Icon icon="vscode-icons:file-type-dartlang" width={size} height={size} className={className} />
            case 'bat':
                return <Icon icon="vscode-icons:file-type-bat" width={size} height={size} className={className} />
            case 'sh':
                return <Icon icon="vscode-icons:file-type-powershell" width={size} height={size} className={className} />
            case 'sql':
                return <Icon icon="vscode-icons:file-type-sql" width={size} height={size} className={className} />
            case 'env':
                return <Icon icon="eos-icons:locked-env" width={size} height={size} className={className} />
            case 'prisma':
                return <Icon icon="vscode-icons:file-type-light-prisma" width={size} height={size} className={className} />

            // Web Development
            case 'html':
                return <Icon icon="vscode-icons:file-type-html" width={size} height={size} className={className} />
            case 'htm':
            case 'css':
                return <Icon icon="vscode-icons:file-type-css2" width={size} height={size} className={className} />
            case 'scss':
            case 'sass':
            case 'less':
            case 'svg':
                return <FileCode size={size} className={`text-orange-500 ${className}`} />;

            // Images
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'webp':
            case 'ico':
            case 'tiff':
                return <FileImage size={size} className={`text-purple-500 ${className}`} />;

            // Video
            case 'mp4':
            case 'avi':
            case 'mov':
            case 'wmv':
            case 'flv':
            case 'mkv':
            case 'webm':
                return <FileVideo size={size} className={`text-red-500 ${className}`} />;

            // Audio
            case 'mp3':
            case 'wav':
            case 'ogg':
            case 'm4a':
            case 'flac':
            case 'aac':
                return <FileAudio size={size} className={`text-pink-500 ${className}`} />;

            // Archives
            case 'zip':
            case 'rar':
            case '7z':
            case 'tar':
            case 'gz':
            case 'bz2':
                return <FileArchive size={size} className={`text-gray-500 ${className}`} />;

            // Spreadsheets
            case 'xls':
            case 'xlsx':
            case 'csv':
            case 'ods':
                return <FileSpreadsheet size={size} className={`text-green-600 ${className}`} />;

            // PDFs
            // Font files
            case 'ttf':
            case 'otf':
            case 'woff':
            case 'woff2':
                return <FileType size={size} className={`text-indigo-500 ${className}`} />;

            // Default
            default:
                return <File size={size} className={`text-gray-400 ${className}`} />;
        }
    };

    const extension = getFileExtension(fileName);
    return getIconByExtension(extension);
};

export default FileIcon;