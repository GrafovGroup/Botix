import { Arrow } from "@/components/icons";
import Link from "next/link";
export default function NotFound() {
  return (
    <section className="error-page">
      <p className="eyebrow">404</p>
      <h1>
        Page not found.
        <br />
        Page introuvable.
      </h1>
      <p>The requested page does not exist. / La page demandée n’existe pas.</p>
      <Link className="button" href="/en">
        ENGLISH <Arrow />
      </Link>{" "}
      <Link className="button ghost" href="/fr">
        FRANÇAIS <Arrow />
      </Link>
    </section>
  );
}
