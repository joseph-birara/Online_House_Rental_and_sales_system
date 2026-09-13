import ServiceCard from "./ServiceCard";
import AboutLayout from "./AboutLayout";
import styles from "./AboutUs.module.css";
import rentalIcon from "./Images/rent.jpg";
import salesIcon from "./Images/Sale.jpg";
import managementIcon from "./Images/manage.jpg";

const Services = () => {
  const services = [
    {
      title: "House rental",
      description:
        "Browse monthly and short-stay homes, filter by neighborhood and budget, and apply to rent in a few steps.",
      icon: rentalIcon,
      href: "/rent",
      actionLabel: "Browse rentals",
    },
    {
      title: "House sales",
      description:
        "Discover homes for sale or list your own property. Buyers can review details and send an application to the owner.",
      icon: salesIcon,
      href: "/buy",
      actionLabel: "Homes for sale",
    },
    {
      title: "Home management",
      description:
        "Owners can keep listings, applications, and tenant requests in one place so properties stay organized after they go live.",
      icon: managementIcon,
      href: "/register",
      actionLabel: "Get started",
    },
  ];

  return (
    <AboutLayout
      eyebrow="About us"
      title="What Homiee offers"
      subtitle="One platform for renting, buying, and managing homes — without the noise."
    >
      <div className={styles.serviceGrid}>
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </AboutLayout>
  );
};

export default Services;
