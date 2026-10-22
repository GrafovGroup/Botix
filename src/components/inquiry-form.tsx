"use client";
import { useEffect, useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import {
  categoryValues,
  formText,
  intents,
  inquirySchema,
  provinceValues,
} from "@/lib/inquiry";
import { type Locale, phone } from "@/lib/content";
import { regions } from "@/lib/locations";
import { publishableProducts } from "@/lib/catalog";
import type { InquiryContext } from "@/lib/inquiry-context";
export function InquiryForm({
  locale,
  initial = {},
}: {
  locale: Locale;
  initial?: InquiryContext;
}) {
  const [selectedIntent, setSelectedIntent] = useState(
    initial.intent || "general",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    initial.category || "unsure",
  );
  const [selectedProduct, setSelectedProduct] = useState(initial.product || "");
  const availableProducts = publishableProducts().filter(
    (p) =>
      p.flags.inquiries && p.category === selectedCategory &&
      p.inquiryOptions.some(
        (i) =>
          i === (selectedIntent === "integration" ? "pilot" : selectedIntent),
      ),
  );
  const t = formText[locale];
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const status = useRef<HTMLDivElement>(null);
  const refresh = () =>
    fetch("/api/inquiry", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setToken(d.token))
      .catch(() => setToken(""));
  useEffect(() => {
    void refresh();
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    if (!token) {
      setMessage(t.unavailable);
      return;
    }
    const values = Object.fromEntries(new FormData(form));
    const parsed = inquirySchema.safeParse({
      ...values,
      locale,
      token,
      consent: values.consent === "on",
    });
    setSuccess(false);
    if (!parsed.success) {
      setErrors(parsed.error.issues.map((i) => String(i.path[0])));
      setMessage(t.invalid);
      form
        .querySelector<HTMLElement>(
          `[name="${String(parsed.error.issues[0].path[0])}"]`,
        )
        ?.focus();
      return;
    }
    setBusy(true);
    setErrors([]);
    setMessage("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        setSuccess(true);
        setMessage(t.success);
        form.reset();
        await refresh();
      } else {
        setMessage(data.error === "unconfigured" ? t.unavailable : t.failed);
        setErrors(data.fields || []);
        if (data.error === "token") await refresh();
      }
    } catch {
      setMessage(t.failed);
    } finally {
      setBusy(false);
      setTimeout(() => status.current?.focus(), 0);
    }
  }
  const input = (name: string, label: string, type = "text", extra = {}) => (
    <label className="field" key={name}>
      {label}
      <input
        name={name}
        type={type}
        required={name !== "budget"}
        maxLength={name === "email" ? 254 : 160}
        aria-invalid={errors.includes(name)}
        {...extra}
      />
      {errors.includes(name) && (
        <small className="field-error">{t.fieldError}</small>
      )}
    </label>
  );
  const select = (
    name: string,
    label: string,
    values: readonly string[],
    labels: string[],
    extra = {},
  ) => (
    <label className="field" key={name}>
      {label}
      <select
        name={name}
        required
        defaultValue={"value" in extra ? undefined : ""}
        aria-invalid={errors.includes(name)}
        {...extra}
      >
        <option value="" disabled>
          {t.choose}
        </option>
        {values.map((v, i) => (
          <option key={v} value={v}>
            {labels[i]}
          </option>
        ))}
      </select>
      {errors.includes(name) && (
        <small className="field-error">{t.fieldError}</small>
      )}
    </label>
  );
  return (
    <form className="inquiry-form" onSubmit={submit}>
      <p className="form-note">{t.required}</p>
      <div className="form-grid">
        {select("intent", t.intent, intents, t.intents, {
          value: selectedIntent,
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedIntent(e.target.value as typeof selectedIntent);
            setSelectedProduct("");
          },
        })}
        {select("category", t.category, categoryValues, t.categories, {
          value: selectedCategory,
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedCategory(e.target.value as typeof selectedCategory);
            setSelectedProduct("");
          },
        })}
        <label className="field full">
          {t.product}
          <select
            name="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            aria-invalid={errors.includes("product")}
          >
            <option value="">
              {locale === "en" ? "No specific model" : "Aucun modèle précis"}
            </option>
            {availableProducts.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name[locale]}
              </option>
            ))}
          </select>
        </label>
        {input("useCase", t.useCase, "text", {
          minLength: 10,
          maxLength: 600,
          defaultValue: initial.useCase || "",
        })}
        {input("startDate", t.startDate, "date", {
          required: selectedIntent === "rental",
        })}
        {input("endDate", t.endDate, "date", {
          required: selectedIntent === "rental",
        })}
        <p className="form-note full">{t.datesNote}</p>
        {input("company", t.company, "text", { autoComplete: "organization" })}
        {input("name", t.name, "text", { autoComplete: "name" })}
        {input("email", t.email, "email", { autoComplete: "email" })}
        {input("phone", t.phone, "tel", { autoComplete: "tel" })}
        {input("city", t.city, "text", {
          autoComplete: "address-level2",
          defaultValue: initial.city || "",
        })}
        {select(
          "province",
          t.province,
          provinceValues,
          provinceValues.map(
            (code) => regions.find((r) => r.code === code)!.name[locale],
          ),
        )}
        {select(
          "timeline",
          t.timeline,
          ["soon", "1-3", "3-6", "exploring"],
          t.timelines,
        )}
        {input("quantity", t.quantity, "number", {
          min: 1,
          max: 10000,
          defaultValue: 1,
        })}
        {input("budget", t.budget)}
        <label className="field full">
          {t.details}
          <textarea
            name="details"
            rows={5}
            minLength={20}
            maxLength={4000}
            required
            aria-invalid={errors.includes("details")}
          />
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        {t.consent}
      </label>
      <Link className="text-link" href={`/${locale}/privacy`}>
        {t.privacy} ↗
      </Link>
      <div className="form-actions">
        <button className="button" type="submit" disabled={busy}>
          {busy ? t.sending : t.submit}
          <span aria-hidden>↗</span>
        </button>
        <a href="tel:+18336969996">{phone}</a>
      </div>
      {message && (
        <div
          className={`form-status ${success ? "success" : ""}`}
          ref={status}
          tabIndex={-1}
          role={success ? "status" : "alert"}
        >
          {message}
        </div>
      )}
      <noscript>
        <p>
          {t.unavailable} <a href="tel:+18336969996">{phone}</a>
        </p>
      </noscript>
    </form>
  );
}
