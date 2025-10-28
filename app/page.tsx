import React from "react";


import { cn } from "@/lib/utils";
import Container from "@/components/ui/container-view";
import Navbar from "@/components/ui/navbar-view";
import { ServerComponent } from "@/components/ui/user-session";
import { LandingPage } from "@/components/ui/landing-view-page";
async function Page() {
  
  return (
    <Container>
     <LandingPage />
    </Container>
  );
}

export default Page;
