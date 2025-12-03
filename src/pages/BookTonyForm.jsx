import React, { useState } from "react";

export default function BookTonyForm() {
    const [loading, setLoading] = useState(false);

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycby0sagK38jtnzcxhuiSciGJBVgIU6vj1FFmdUuuy0CtHysKDZbukgyoKcbX23Cb42xz/exec";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;

        // Anti-spam bot honeypot
        if (form.bot_field.value !== "") {
            setLoading(false);
            return;
        }

        // Build data object
        const data = {
            first_name: form.first_name.value.trim(),
            last_name: form.last_name.value.trim(),
            full_name:
                form.first_name.value.trim() + " " + form.last_name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            company: form.company.value.trim(),
            event_date: form.event_date.value.trim(),
            budget: form.budget.value.trim(),
            source: form.source.value.trim(),
            message: form.message.value.trim(),
            form_page: "Book Tony Form",
        };

        try {
            const res = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            // Redirect even though response is opaque (no-cors)
            window.location.href = "/tony-thompson-spmn-vital/thank-you";
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <section className="min-h-screen bg-black text-white px-6 py-20 flex items-center justify-center">

            <style>{`
                .form-input {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 0.75rem;
                    padding: 0.95rem 1.25rem;
                    width: 100%;
                    color: white;
                    transition: all 0.25s ease;
                    outline: none;
                }
                .form-input::placeholder {
                    color: rgba(255,255,255,0.4);
                }
                .form-input:focus {
                    border-color: #9b26b6;
                    box-shadow: 0 0 0 3px rgba(155,38,182,0.4);
                }
            `}</style>

            <div className="w-full max-w-5xl bg-black/40 border border-white/10 
                backdrop-blur-xl rounded-3xl shadow-[0_0_80px_rgba(155,38,182,0.35)] overflow-hidden">

                <div className="px-10 py-12 border-b border-white/10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mx-auto">
                        Book Tony Thompson
                    </h1>

                    <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
                        Complete the form below and Tony’s team will follow up with next steps and availability.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-10 py-12 space-y-8">

                    {/* Honeypot field (hidden) */}
                    <input
                        type="text"
                        name="bot_field"
                        style={{ display: "none" }}
                    />

                    {/* NAME */}
                    <div>
                        <label className="block text-sm mb-3 tracking-wide uppercase text-white/70">
                            Name *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input name="first_name" required placeholder="First Name" className="form-input" />
                            <input name="last_name" required placeholder="Last Name" className="form-input" />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm mb-3 tracking-wide uppercase text-white/70">
                            Email *
                        </label>
                        <input name="email" type="email" required placeholder="you@example.com" className="form-input" />
                    </div>

                    {/* PHONE + COMPANY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm mb-3 tracking-wide uppercase text-white/70">
                                Phone
                            </label>
                            <input name="phone" placeholder="(+1) 123-456-7890" className="form-input" />
                        </div>

                        <div>
                            <label className="block text-sm mb-3 tracking-wide uppercase text-white/70">
                                Company *
                            </label>
                            <input name="company" required placeholder="Organization Name" className="form-input" />
                        </div>
                    </div>

                    {/* EVENT DATE + BUDGET */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm mb-3 tracking-wide uppercase text-white/70">
                                Event Date *
                            </label>
                            <input type="date" name="event_date" required className="form-input" />
                        </div>

                        <div>
                            <label className="block text-sm mb-3 tracking-wide uppercase text-white/70">
                                Budget
                            </label>
                            <input name="budget" placeholder="Optional" className="form-input" />
                        </div>
                    </div>

                    {/* SOURCE */}
                    <div>
                        <label className="block text-sm mb-3 tracking-wide uppercase text-white/70">
                            How did you hear about Tony? *
                        </label>
                        <select name="source" required className="form-input">
                            <option value="">Select an option</option>
                            <option value="event">Saw Tony at an event</option>
                            <option value="referral">Referral</option>
                            <option value="social">Social Media</option>
                            <option value="nammba">NAMMBA</option>
                            <option value="podcast">Podcast</option>
                            <option value="web">Web Search</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* MESSAGE */}
                    <div>
                        <label className="block text-sm mb-3 tracking-wide uppercase text-white/70">
                            Message *
                        </label>
                        <textarea name="message" required rows={5} placeholder="Tell us more about your event…" className="form-input resize-none" />
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-12 py-4 rounded-xl bg-gradient-to-br 
                            from-[#7d1f97] to-[#952ca8] text-white
                            font-semibold tracking-wider text-lg
                            shadow-[0_15px_40px_rgba(155,38,182,0.5)]
                            hover:scale-[1.02] transition-transform"
                    >
                        {loading ? "Sending..." : "Send Inquiry"}
                    </button>

                </form>
            </div>
        </section>
    );
}
