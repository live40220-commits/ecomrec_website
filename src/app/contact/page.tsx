import { Mail, MapPin, Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <section className="container-lux py-14">
      <h1 className="mb-10 font-serif text-6xl">Contact Us</h1>
      <div className="grid gap-10 lg:grid-cols-2">
        <form className="grid gap-4">
          <Input placeholder="Name" />
          <Input placeholder="E-mail" />
          <Textarea placeholder="Message" />
          <Button>Send Message</Button>
        </form>
        <div>
          <div className="grid gap-4">
            <p className="flex gap-3">
              <MapPin /> Sierra Collections, 88-B Block, Gulberg III, Lahore, Pakistan
            </p>
            <p className="flex gap-3">
              <Phone /> +92 300 1234567 (WhatsApp Helpline)
            </p>
            <p className="flex gap-3">
              <Mail /> care@sierracollections.com
            </p>
            <p className="flex gap-3">
              <Share2 /> @sierracollections
            </p>
          </div>
          <div className="mt-8 aspect-[16/10] border border-line bg-[linear-gradient(135deg,#e8dfd6,#b6805d,#151515)] p-6 text-white">
            <p className="tracked-luxury">Lahore Flagship Studio Map</p>
            <p className="mt-4 max-w-sm text-sm text-white/80">
              Visit our Flagship Store in Gulberg III for custom fittings, bridal consults, and to browse our latest lawn & festive collections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
