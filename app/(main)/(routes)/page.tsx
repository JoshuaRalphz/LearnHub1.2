"use client"
import { ChakraProvider } from "@chakra-ui/react"

import CallToActionWithAnnotation from "@/components/landingPage/HeroSection";
import SimpleThreeColumns from "@/components/landingPage/Features";
import SplitWithImage from "@/components/landingPage/Testimonials";
import SmallWithSocial from "@/components/landingPage/Footer";



const LandingPage = () => {
  return (
    <ChakraProvider>
      <div>
        <CallToActionWithAnnotation />
        <SimpleThreeColumns />
        <SplitWithImage />
        <SmallWithSocial />
      </div>
    </ChakraProvider>
  )
}

export default LandingPage;