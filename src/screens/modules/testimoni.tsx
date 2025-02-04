import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const testimonials = [
    {
        name: 'Elena Rodriguez',
        role: 'Chief Technology Officer',
        company: 'TechInnovate Solutions',
        comment: 'Lokio has revolutionized our project management approach. Its intuitive design and powerful features have significantly boosted our team\'s productivity.',
        avatar: 'https://github.com/kevin.png',
        rating: 5,
    },
    {
        name: 'Marcus Chen',
        role: 'Lead Software Architect',
        company: 'GlobalSoft Enterprises',
        comment: 'The modular design and seamless integration capabilities make Lokio an indispensable tool for modern software development.',
        avatar: 'https://github.com/kevin.png',
        rating: 4.5,
    },
    {
        name: 'Sarah Thompson',
        role: 'Product Design Manager',
        company: 'Creative Digital Agency',
        comment: 'Lokio\'s collaborative features and real-time synchronization have transformed how our design and development teams work together.',
        avatar: 'https://github.com/kevin.png',
        rating: 5,
    }
];

const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
        <Icon 
            key={index?.toString()} 
            icon="mdi:star" 
            className={`w-5 h-5 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
        />
    ));
};

export function ModuleTestimoni() {
    return (
        <div className="bg-gradient-to-b from-secondary/5 to-secondary/10 py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-8 mb-16"
                >
                    <h2 className="text-4xl font-bold tracking-tight">
                        Trusted by <span className="text-primary">Innovators</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Real stories from teams transforming their workflows
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.6, 
                                delay: index * 0.2 
                            }}
                            className="bg-background rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/50 transition-all">
                                    <Image 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name} 
                                        width={64} 
                                        height={64} 
                                        className="object-cover" 
                                    />
                                </div>
                                <div className="flex space-x-1">
                                    {renderStars(testimonial.rating)}
                                </div>
                            </div>
                            
                            <p className="text-lg text-muted-foreground italic mb-6 h-24 overflow-hidden">
                                &quot;{testimonial.comment}&quot;
                            </p>
                            
                            <div className="border-t border-secondary/20 pt-4">
                                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <span>{testimonial.role}</span>
                                    <span>•</span>
                                    <span>{testimonial.company}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ModuleTestimoni;