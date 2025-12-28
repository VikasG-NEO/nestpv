import { Logo } from "@/components/Logo";
import { Facebook, Twitter, Youtube, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const { t } = useLanguage();

  const mainLinks = [
    { labelKey: "footer.about", href: "#" },
    { labelKey: "footer.privacy", href: "#" },
    { labelKey: "footer.terms", href: "#" },
    { labelKey: "footer.contact", href: "#contact" },
  ];

  const secondaryLinks = [
    { labelKey: "footer.about", href: "#" },
    { labelKey: "footer.updates", href: "#" },
    { labelKey: "footer.support", href: "#" },
    { labelKey: "footer.helpCompanies", href: "#" },
    { labelKey: "footer.forNations", href: "#" },
  ];

  return (
    <footer id="contact" className="bg-slate-100 border-t border-border">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Logo size="md" />
            
            {/* Main Links */}
            <nav className="hidden md:flex items-center gap-6">
              {mainLinks.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <a href="mailto:support@nestunion.com" className="text-sm text-muted-foreground hover:text-foreground">
              support@nestunion.com
            </a>
            
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {t('footer.rights')}
          </p>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            {secondaryLinks.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}