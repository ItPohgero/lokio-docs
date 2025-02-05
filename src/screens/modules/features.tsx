import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const features = [
    {
        icon: 'carbon:code',
        title: 'Code Structuring',
        description: 'Automatically structure your codebase for better readability and maintainability.',
    },
    {
        icon: 'carbon:settings',
        title: 'Customizable Templates',
        description: 'Use pre-built templates or create your own to speed up project setup.',
    },
    {
        icon: 'carbon:rocket',
        title: 'Fast & Efficient',
        description: 'Optimized for performance, ensuring your projects run smoothly and efficiently.',
    },
];

export function ModuleFeatures() {
    return (
        <div className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center space-y-8"
                >
                                    <h2 className="text-4xl font-bold tracking-tight">
                                    Powerful <span className="text-primary">Features</span>

                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Lokio comes packed with features designed to make your development process smoother and more efficient.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {features.map(({ icon, title, description }, index) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="bg-secondary/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                                <Icon icon={icon} className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mt-6">{title}</h3>
                            <p className="text-muted-foreground mt-2">{description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}