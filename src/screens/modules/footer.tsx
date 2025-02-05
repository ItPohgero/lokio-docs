import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';

export function ModuleFooter() {
    return (
        <footer className="bg-background border-t border-secondary/20">
            <div className="container mx-auto px-0 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-primary">Lokio</h2>
                        <p className="text-muted-foreground">
                            Lokio is a modern development tool designed to make your workflow faster, smoother, and more efficient.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { label: 'Home', link: '/' },
                                { label: 'About', link: 'https://itpohgero.com' },
                            ].map((item, index) => (
                                <li key={index?.toString()}>
                                    <Link
                                        href={item.link}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="text-muted-foreground flex items-center space-x-2">
                                <Icon icon="ri:map-pin-line" className="w-5 h-5" />
                                <span>Ponorogo, East Java, Indonesia</span>
                            </li>
                            <li className="text-muted-foreground flex items-center space-x-2">
                                <Icon icon="ri:mail-line" className="w-5 h-5" />
                                <span>support@lokio.dev</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold">Supported</h3>
                        <p className="text-muted-foreground">
                            Thank you for helping to develop
                        </p>

                        <div className='flex flex-wrap justify-start items-center gap-2'>
                            <Image src="/logo/akt.svg" alt="akt" width={70} height={70} />
                            <Image src="/logo/mataramandev.svg" alt="mataramandev" width={40} height={40} />
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="border-t border-secondary/20 mt-8 pt-8 text-center text-muted-foreground"
                >
                    <p>&copy; {new Date().getFullYear()} Lokio. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
}