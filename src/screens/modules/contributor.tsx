import type React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';


interface Contributor {
    name: string;
    avatar: string;
    contribution: number;
    link?: string;
}

interface Contributor {
    name: string;
    avatar: string;
    contribution: number;
    link?: string;
}

export const ModuleContributors: React.FC = () => {
    const [contributors, setContributors] = useState<Contributor[]>()

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const res = await fetch('/api/contributors', { cache: 'no-store' })
                const contributors = await res.json()
                setContributors(contributors);
            } catch (error) {
                console.error('Error fetching contributors:', error);
            }
        };

        fetchContributors();
    }, []);

    // Sort contributors by contribution
    const sortedContributors = contributors ? [...contributors].sort((a, b) => b.contribution - a.contribution) : [];
    const maxContribution = sortedContributors.length > 0 ? sortedContributors[0].contribution : 0;

    const getContributionLevel = (contribution: number) => {
        const percentage = (contribution / maxContribution) * 100;
        if (percentage > 80) return 'Platinum';
        if (percentage > 60) return 'Gold';
        if (percentage > 40) return 'Silver';
        if (percentage > 20) return 'Bronze';
        return 'Contributor';
    };

    return (
        <Suspense fallback={<div>Loading contributors...</div>}>
            <section className="bg-gradient-to-b from-secondary/5 to-secondary/10 py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            Project <span className="text-primary">Contributors</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Celebrating the incredible individuals who drive our project forward
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {sortedContributors.map((contributor) => (
                            <motion.div
                                key={contributor.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative group w-20 lg:w-32 h-20 lg:h-32 aspect-square"
                            >
                                <div
                                    className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 
                                    hover:shadow-2xl hover:scale-105 cursor-pointer"
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <Image
                                            src={contributor.avatar}
                                            alt={contributor.name}
                                            width={20}
                                            height={20}
                                            className="w-full h-full object-cover transition-transform 
                                            duration-300 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className={`
                                    absolute inset-0 bg-black/50 
                                    flex flex-col justify-end p-4 text-white
                                    opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300
                                `}>
                                        <div className="font-bold truncate mt-2">{contributor.name}</div>
                                        <div className="text-sm truncate">
                                            {contributor.contribution} Contributions
                                        </div>
                                        <div className="text-xs mt-1 text-secondary-foreground">
                                            {getContributionLevel(contributor.contribution)}
                                        </div>
                                        {contributor.link && (
                                            <Link
                                                href={contributor.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute top-4 right-4 text-white hover:text-primary"
                                            >
                                                <Icon icon="mdi:github" className="w-6 h-6" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </Suspense>
    );
};

export default ModuleContributors;