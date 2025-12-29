
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CompanyRegistration from "./pages/CompanyRegistration";
import VerifyID from "./pages/VerifyID";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import WalletPage from "./pages/dashboard/WalletPage";
import BenefitsPage from "./pages/dashboard/BenefitsPage";
import SchemesPage from "./pages/dashboard/SchemesPage";
import CommunityPage from "./pages/dashboard/CommunityPage";
import SupportPage from "./pages/dashboard/SupportPage";
import IDCardPage from "./pages/dashboard/IDCardPage";
import BankPage from "./pages/dashboard/BankPage";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <LanguageProvider>
            <TooltipProvider>
                <Toaster />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/register-company" element={<CompanyRegistration />} />
                        <Route path="/verify/:memberId" element={<VerifyID />} />

                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route index element={<Overview />} />
                            <Route path="overview" element={<Overview />} />
                            <Route path="wallet" element={<WalletPage />} />
                            <Route path="transactions" element={<TransactionsPage />} />
                            <Route path="benefits" element={<BenefitsPage />} />
                            <Route path="schemes" element={<SchemesPage />} />
                            <Route path="community" element={<CommunityPage />} />
                            <Route path="support" element={<SupportPage />} />
                            <Route path="id-card" element={<IDCardPage />} />
                            <Route path="bank" element={<BankPage />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </LanguageProvider>
    </QueryClientProvider>
);

export default App;
