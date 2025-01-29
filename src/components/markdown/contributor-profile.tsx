'use client';
import React, { useEffect, useState } from "react";
import Image from "./image";

interface Contributor {
    username: string;
    profileUrl: string;
    avatarUrl: string;
}

const ContributorProfile: React.FC<{ username: string }> = ({ username }) => {
    const [contributor, setContributor] = useState<Contributor | null>(null);

    useEffect(() => {
        const fetchContributor = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                const data = await response.json();
                setContributor({
                    username: data.login,
                    profileUrl: data.html_url,
                    avatarUrl: data.avatar_url,
                });
            } catch (error) {
                console.error("Error fetching contributor data:", error);
            }
        };

        fetchContributor();
    }, [username]);

    if (!contributor) {
        return <div className="aspect-square w-[40px] bg-secondary rounded-full"/>;
    }

    return (
        <div className="aspect-square w-max relative">
            <a
                href={contributor.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src={contributor.avatarUrl}
                    alt={contributor.username}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                    className="mx-auto"
                />
            </a>
        </div>
    );
};

export default ContributorProfile;
