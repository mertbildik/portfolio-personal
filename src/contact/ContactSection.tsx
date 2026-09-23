'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { CheckCircle2, ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react';
import ActionCircle from '../shared/ActionCircle';
import { EASE } from '../shared/motion';
import SectionIntro from '../shared/SectionIntro';
import { CONTACT_EMAIL, LINKEDIN_URL } from './details';

const formIsReady = (form: HTMLFormElement) => {
    const data = new FormData(form);
    return (
        form.checkValidity() &&
        ['name', 'email', 'message'].every((field) => String(data.get(field) ?? '').trim())
    );
};

const LiveClock: React.FC = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // The page was rendered when the site was built, so the time it arrived
        // with is stale; replace it the moment the page comes alive.
        setDate(new Date());
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Warsaw',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const timeString = formatter.format(date);

    return (
        <div className="flex items-baseline gap-2">
            {/* The built page and the visitor's clock never agree, which React
                would otherwise report as a hydration mismatch. */}
            <span suppressHydrationWarning className="text-data font-mono text-ink">
                {timeString}
            </span>
            <span className="text-small text-ink-secondary">
                Warsaw, <span className="font-mono text-data">PL</span>
            </span>
        </div>
    );
};

/**
 * `error` means the send was attempted and failed, so retrying is worth it.
 * `unavailable` means the form has no Formspree id to post to, which retrying
 * can never fix — the visitor is pointed at the email address instead.
 */
type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'unavailable';

const ContactSection: React.FC = () => {
    const [formState, setFormState] = useState<FormState>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [emailCopied, setEmailCopied] = useState(false);
    const [isFormReady, setIsFormReady] = useState(false);
    const copyTimeoutRef = useRef<number | null>(null);

    useEffect(
        () => () => {
            if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);
        },
        [],
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formIsReady(e.currentTarget as HTMLFormElement)) return;
        setFormState('submitting');

        const formSpreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
        const endpoint = formSpreeId ? `https://formspree.io/f/${formSpreeId}` : null;

        if (!endpoint) {
            console.error('NEXT_PUBLIC_FORMSPREE_ID is not set, so the contact form cannot send.');
            setFormState('unavailable');
            return;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Formspree replies with JSON rather than an HTML redirect
                    // page when asked for it.
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setFormState('success');
            } else {
                setFormState('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setFormState('error');
        }
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT_EMAIL);
            setEmailCopied(true);
            if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);
            copyTimeoutRef.current = window.setTimeout(() => setEmailCopied(false), 2000);
        } catch (error) {
            console.error('Copy failed:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        // The one place motion animates: its transforms resolve without movement
        // when the visitor asks for less motion.
        <MotionConfig reducedMotion="user">
            <SectionIntro
                title="Let's talk."
                description="Available for new projects. I reply within 24 hours."
            />

            <div className="relative z-30 mt-10 flex h-full flex-col justify-center md:mt-12">
                <div className="flex w-full flex-col gap-10 md:gap-12">
                    {/* SECTION: FORM INTERFACE */}
                    <AnimatePresence mode="wait">
                        {formState === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                transition={{ duration: 0.16, ease: EASE }}
                                className="rule-y py-8"
                            >
                                <CheckCircle2
                                    size={24}
                                    className="text-ok mb-4"
                                    strokeWidth={1.5}
                                />
                                <h3 className="text-heading text-ink">Request initiated.</h3>
                                <p className="text-ink text-small max-w-measure mb-6">
                                    I'll review your brief shortly. Expect a response at{' '}
                                    {formData.email}.
                                </p>
                                <button
                                    onClick={() => {
                                        setFormState('idle');
                                        setFormData({ name: '', email: '', message: '' });
                                        setIsFormReady(false);
                                    }}
                                    className="text-label text-ink decoration-ink-secondary underline-offset-4 hover:underline"
                                >
                                    Start over
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                onInput={(event) => {
                                    setIsFormReady(formIsReady(event.currentTarget));
                                    // A failed send is stale as soon as the visitor
                                    // changes something; `unavailable` is not, because
                                    // editing cannot supply the missing id.
                                    setFormState((state) => (state === 'error' ? 'idle' : state));
                                }}
                                className="rule-y"
                            >
                                <div className="group relative grid grid-cols-1 gap-2 rule-b px-4 py-4 transition-colors duration-state ease-out focus-within:bg-hover md:grid-cols-[9rem_minmax(0,1fr)] md:gap-6 md:px-6">
                                    <label
                                        htmlFor="contact-name"
                                        className="text-label text-ink-secondary group-focus-within:text-ink transition-colors duration-state ease-out md:pt-3"
                                    >
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        id="contact-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full min-h-11 bg-transparent text-ink text-body focus:outline-none placeholder:text-ink-faint pr-6"
                                        placeholder="How should I address you?"
                                    />
                                    <span
                                        className="absolute top-6 right-6 opacity-0 group-focus-within:opacity-100 transition-opacity duration-state ease-out text-ink text-data font-mono"
                                        aria-hidden="true"
                                    >
                                        +
                                    </span>
                                </div>

                                <div className="group relative grid grid-cols-1 gap-2 rule-b px-4 py-4 transition-colors duration-state ease-out focus-within:bg-hover md:grid-cols-[9rem_minmax(0,1fr)] md:gap-6 md:px-6">
                                    <label
                                        htmlFor="contact-email"
                                        className="text-label text-ink-secondary group-focus-within:text-ink transition-colors duration-state ease-out md:pt-3"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full min-h-11 bg-transparent text-ink text-body focus:outline-none placeholder:text-ink-faint pr-6"
                                        placeholder="you@company.com"
                                    />
                                    <span
                                        className="absolute top-6 right-6 opacity-0 group-focus-within:opacity-100 transition-opacity duration-state ease-out text-ink text-data font-mono"
                                        aria-hidden="true"
                                    >
                                        +
                                    </span>
                                </div>

                                <div className="group relative grid grid-cols-1 gap-2 rule-b px-4 py-4 transition-colors duration-state ease-out focus-within:bg-hover md:grid-cols-[9rem_minmax(0,1fr)] md:gap-6 md:px-6">
                                    <label
                                        htmlFor="contact-message"
                                        className="text-label text-ink-secondary group-focus-within:text-ink transition-colors duration-state ease-out md:pt-1"
                                    >
                                        Project details
                                    </label>
                                    <textarea
                                        rows={1}
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full bg-transparent text-ink text-body focus:outline-none placeholder:text-ink-faint resize-none min-h-28 md:min-h-20 max-h-[160px] pr-6"
                                        placeholder="What are you building? Include the timeline and budget range if you have them."
                                        onInput={(e) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            target.style.height = 'auto';
                                            target.style.height = target.scrollHeight + 'px';
                                        }}
                                    />
                                    <span
                                        className="absolute top-6 right-6 opacity-0 group-focus-within:opacity-100 transition-opacity duration-state ease-out text-ink text-data font-mono"
                                        aria-hidden="true"
                                    >
                                        +
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formState === 'submitting'}
                                    className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-6 px-4 py-4 transition-colors duration-state ease-out focus-visible:bg-hover disabled:cursor-not-allowed disabled:opacity-50 md:grid-cols-[9rem_minmax(0,1fr)_auto] md:px-6"
                                >
                                    <div className="md:col-start-2 flex flex-col shrink-0 text-left">
                                        <span className="text-label text-ink">
                                            {formState === 'submitting'
                                                ? 'Sending…'
                                                : 'Send inquiry'}
                                        </span>
                                        <span
                                            aria-live="polite"
                                            className="text-small text-ink-secondary mt-1 group-hover:text-ink group-focus-visible:text-ink group-disabled:text-ink-secondary transition-colors duration-state"
                                        >
                                            {isFormReady
                                                ? 'Ready to send.'
                                                : 'Complete all fields.'}
                                        </span>
                                    </div>
                                    <ActionCircle small>
                                        <ArrowRight size={18} />
                                    </ActionCircle>
                                </button>

                                {/*
                                 * The failure message sits outside the submit button:
                                 * it carries a mailto link, and a link inside a button
                                 * is not valid, nor reachable by keyboard.
                                 */}
                                {(formState === 'error' || formState === 'unavailable') && (
                                    <p
                                        role="alert"
                                        className="rule-t flex gap-3 px-4 py-4 text-small text-ink md:px-6"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-danger"
                                        />
                                        <span>
                                            {formState === 'unavailable'
                                                ? 'The form is not connected, so this cannot send. Email me directly at '
                                                : 'Sending failed. Try again, or email me directly at '}
                                            <a
                                                href={`mailto:${CONTACT_EMAIL}`}
                                                className="underline decoration-edge-strong underline-offset-4 transition-colors duration-state ease-out hover:decoration-ink-secondary"
                                            >
                                                {CONTACT_EMAIL}
                                            </a>
                                            .
                                        </span>
                                    </p>
                                )}
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {/* FOOTER METADATA - Data Grid System */}
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-8">
                        {/* 01: Email */}
                        <div className="flex flex-col gap-2 py-6">
                            <span className="text-label text-ink-secondary">Connect</span>
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                aria-label={emailCopied ? 'Email copied' : 'Copy email address'}
                                className="group cursor-pointer flex min-h-11 items-center gap-3 text-ink w-fit"
                            >
                                <span className="text-data font-mono">{CONTACT_EMAIL}</span>
                                {emailCopied ? (
                                    <Check size={12} className="text-ok" />
                                ) : (
                                    <Copy
                                        size={12}
                                        className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-reveal text-ink-secondary"
                                    />
                                )}
                            </button>
                        </div>

                        {/* 02: Social */}
                        <div className="flex flex-col gap-2 py-6">
                            <span className="text-label text-ink-secondary">Networks</span>
                            <div className="flex flex-col gap-2">
                                <a
                                    href={LINKEDIN_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex min-h-11 items-center gap-2 text-ink transition-colors duration-state group w-fit"
                                >
                                    <span className="text-label">LinkedIn</span>
                                    <ArrowUpRight
                                        size={10}
                                        className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-reveal"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* 03: Time - aligned right/end */}
                        <div className="flex flex-col gap-2 py-6">
                            <span className="text-label text-ink-secondary">Local time</span>
                            <div>
                                <LiveClock />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 pb-2 text-small text-ink-secondary">
                        <span>Mert Bildik</span>
                        <span className="font-mono text-data">© 2026</span>
                    </div>
                </div>
            </div>
        </MotionConfig>
    );
};

export default ContactSection;
