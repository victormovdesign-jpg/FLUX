import { sanityFetch } from "@/sanity/client";
import { contactPageQuery, settingsQuery } from "@/sanity/queries";
import type { SanityContactPage, SanitySettings } from "@/sanity/types";
import ContactForm from "@/components/ContactForm";

export const revalidate = 3600;

const FB_CONTACT: SanityContactPage = {
  headline: "Let's work together",
  email: "hello@h.studio",
  phone: "",
  address: "",
  formActionUrl: "#",
  socialLinks: [
    { platform: "Facebook",  url: null },
    { platform: "Instagram", url: null },
    { platform: "X.com",     url: null },
    { platform: "LinkedIn",  url: null },
  ],
};

export default async function ContactPage() {
  const [pageData, settingsData] = await Promise.all([
    sanityFetch<SanityContactPage | null>(contactPageQuery, null),
    sanityFetch<SanitySettings | null>(settingsQuery, null),
  ]);

  const data = pageData ?? FB_CONTACT;
  const headline = data.headline || FB_CONTACT.headline!;
  const email = data.email || FB_CONTACT.email!;
  const phone = data.phone || null;
  const address = data.address || null;
  const formActionUrl = data.formActionUrl || "#";
  const socialLinks = data.socialLinks?.length ? data.socialLinks : FB_CONTACT.socialLinks!;
  const studioName = settingsData?.studioName || "H.Studio";

  return (
    <>
      {/* Narrow black header bar */}
      <section data-nav-dark className="bg-black flex items-center justify-center px-4 pt-[88px] pb-6 md:pt-[96px] md:pb-6">
        <p className="font-[family-name:var(--font-inter)] font-medium text-[18px] md:text-[22px] text-white tracking-[-0.04em] leading-[1.1] text-center">
          {headline}
        </p>
      </section>

      {/* Split content */}
      <section className="bg-white px-4 py-12 md:px-8 md:py-[80px]">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* Left: contact info */}
          <div className="flex flex-col gap-8 md:w-1/2">
            <span className="font-[family-name:var(--font-geist-mono)] text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              [ {studioName} ]
            </span>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#555] uppercase leading-[1.1]">
                  [ Email ]
                </span>
                <a
                  href={`mailto:${email}`}
                  className="font-[family-name:var(--font-inter)] font-normal text-[16px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.3] hover:underline"
                >
                  {email}
                </a>
              </div>

              {phone && (
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#555] uppercase leading-[1.1]">
                    [ Phone ]
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="font-[family-name:var(--font-inter)] font-normal text-[16px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.3] hover:underline"
                  >
                    {phone}
                  </a>
                </div>
              )}

              {address && (
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#555] uppercase leading-[1.1]">
                    [ Address ]
                  </span>
                  <p className="font-[family-name:var(--font-inter)] font-normal text-[16px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.5] whitespace-pre-line">
                    {address}
                  </p>
                </div>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="flex flex-col gap-2">
                {socialLinks.map((s) =>
                  s.platform ? (
                    s.url ? (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1] hover:underline"
                      >
                        {s.platform}
                      </a>
                    ) : (
                      <p
                        key={s.platform}
                        className="font-[family-name:var(--font-inter)] font-normal text-[18px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1]"
                      >
                        {s.platform}
                      </p>
                    )
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Right: form */}
          <div className="md:w-1/2">
            <ContactForm formActionUrl={formActionUrl} />
          </div>
        </div>
      </section>
    </>
  );
}
