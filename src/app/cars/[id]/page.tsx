import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CARS } from "@/data/cars";
import CarDetailClient from "./CarDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return CARS.map((car) => ({
    id: car.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = CARS.find((c) => c.id === id);

  if (!car) {
    return {
      title: "Vehicle Not Found — AWIEwagen",
    };
  }

  return {
    title: `${car.brand} ${car.name} — AWIEwagen Autohaus`,
    description: `${car.brand} ${car.name}: ${car.tagline}. ${car.description}`,
    openGraph: {
      title: `${car.brand} ${car.name} — AWIEwagen`,
      description: car.tagline,
      images: [
        {
          url: car.images[0],
          width: 1200,
          height: 675,
          alt: `${car.brand} ${car.name}`,
        },
      ],
    },
  };
}

export default async function CarPage({ params }: Props) {
  const { id } = await params;
  const car = CARS.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  return <CarDetailClient car={car} />;
}
