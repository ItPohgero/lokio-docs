import { buttonVariants } from '@/components/ui/button';
import { page_routes } from '@/lib/routes-config';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ModuleCallToAction() {
    return (
        <div className="mb-10 mt-20 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-start"
                >
                    <h2 className="text-xl lg:text-3xl font-bold tracking-tight mb-4">
                        Ready to Transform Your Workflow?
                    </h2>
                    <p className="lg:text-xl text-muted-foreground max-w-2xl">
                        Join thousands of developers who are already using Lokio to structure their code and boost productivity.
                    </p>
                    <div className="flex justify-start gap-4 mt-4">
                        
                        <Link
                            href={`/docs${page_routes[0].href}`}
                            className={buttonVariants({
                                variant: "destructive",
                                size: "lg",
                                className: "group bg-orange-700"
                            })}
                        >
                            Docs
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/blog"
                            className={buttonVariants({
                                variant: "secondary",
                                size: "lg",
                            })}
                        >
                            Blogs
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}