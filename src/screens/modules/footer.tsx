import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export function ModuleFooter() {
    return (
        <footer className="bg-background border-t border-secondary/20">
            <div className="container mx-auto px-4 py-12">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Bagian 1: Logo dan Deskripsi */}
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
                        {/* Ikon Media Sosial */}
                        <div className="flex space-x-4">
                            {[
                                { icon: 'ri:facebook-fill', link: '#' },
                                { icon: 'ri:twitter-x-fill', link: '#' },
                                { icon: 'ri:instagram-fill', link: '#' },
                                { icon: 'ri:linkedin-fill', link: '#' },
                            ].map((social, index) => (
                                <Link
                                    key={index?.toString()}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Icon icon={social.icon} className="w-6 h-6" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Bagian 2: Tautan Cepat */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { label: 'Home', link: '#' },
                                { label: 'Features', link: '#' },
                                { label: 'Pricing', link: '#' },
                                { label: 'Contact', link: '#' },
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

                    {/* Bagian 3: Kontak */}
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
                                <span>123 Main Street, City, Country</span>
                            </li>
                            <li className="text-muted-foreground flex items-center space-x-2">
                                <Icon icon="ri:mail-line" className="w-5 h-5" />
                                <span>support@lokio.com</span>
                            </li>
                            <li className="text-muted-foreground flex items-center space-x-2">
                                <Icon icon="ri:phone-line" className="w-5 h-5" />
                                <span>+1 (123) 456-7890</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Bagian 4: Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
                        <p className="text-muted-foreground">
                            Get the latest updates and news directly in your inbox.
                        </p>
                        <form className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 rounded-lg border border-secondary/20 focus:outline-none focus:border-primary"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Bagian Copyright */}
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