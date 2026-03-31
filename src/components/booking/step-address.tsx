import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StepProps, Address } from "./types";

/* -------------------------------------------------------------------------- */
/*  Brussels-area municipalities with postal codes                            */
/* -------------------------------------------------------------------------- */

interface Municipality {
  postalCode: string;
  city: string;
}

const MUNICIPALITIES: Municipality[] = [
  // Brussels Capital Region
  { postalCode: "1000", city: "Bruxelles / Brussel" },
  { postalCode: "1020", city: "Laeken / Laken" },
  { postalCode: "1030", city: "Schaerbeek / Schaarbeek" },
  { postalCode: "1040", city: "Etterbeek" },
  { postalCode: "1050", city: "Ixelles / Elsene" },
  { postalCode: "1060", city: "Saint-Gilles / Sint-Gillis" },
  { postalCode: "1070", city: "Anderlecht" },
  { postalCode: "1080", city: "Molenbeek-Saint-Jean / Sint-Jans-Molenbeek" },
  { postalCode: "1081", city: "Koekelberg" },
  { postalCode: "1082", city: "Berchem-Sainte-Agathe / Sint-Agatha-Berchem" },
  { postalCode: "1083", city: "Ganshoren" },
  { postalCode: "1090", city: "Jette" },
  { postalCode: "1140", city: "Evere" },
  { postalCode: "1150", city: "Woluwe-Saint-Pierre / Sint-Pieters-Woluwe" },
  { postalCode: "1160", city: "Auderghem / Oudergem" },
  { postalCode: "1170", city: "Watermael-Boitsfort / Watermaal-Bosvoorde" },
  { postalCode: "1180", city: "Uccle / Ukkel" },
  { postalCode: "1190", city: "Forest / Vorst" },
  { postalCode: "1200", city: "Woluwe-Saint-Lambert / Sint-Lambrechts-Woluwe" },
  { postalCode: "1210", city: "Saint-Josse-ten-Noode / Sint-Joost-ten-Node" },
  // Flemish Brabant periphery
  { postalCode: "1800", city: "Vilvoorde" },
  { postalCode: "1820", city: "Steenokkerzeel" },
  { postalCode: "1830", city: "Machelen" },
  { postalCode: "1831", city: "Diegem" },
  { postalCode: "1840", city: "Londerzeel" },
  { postalCode: "1850", city: "Grimbergen" },
  { postalCode: "1851", city: "Humbeek" },
  { postalCode: "1852", city: "Beigem" },
  { postalCode: "1853", city: "Strombeek-Bever" },
  { postalCode: "1860", city: "Meise" },
  { postalCode: "1861", city: "Wolvertem" },
  { postalCode: "1880", city: "Kapelle-op-den-Bos" },
  { postalCode: "1910", city: "Kampenhout" },
  { postalCode: "1930", city: "Zaventem" },
  { postalCode: "1931", city: "Brucargo" },
  { postalCode: "1932", city: "Sint-Stevens-Woluwe" },
  { postalCode: "1933", city: "Sterrebeek" },
  { postalCode: "1950", city: "Kraainem" },
  { postalCode: "1970", city: "Wezembeek-Oppem" },
  { postalCode: "1980", city: "Zemst" },
  { postalCode: "1981", city: "Hofstade" },
  { postalCode: "1982", city: "Elewijt" },
  { postalCode: "1820", city: "Perk" },
  // Walloon Brabant nearby
  { postalCode: "1300", city: "Wavre" },
  { postalCode: "1310", city: "La Hulpe" },
  { postalCode: "1320", city: "Beauvechain" },
  { postalCode: "1330", city: "Rixensart" },
  { postalCode: "1340", city: "Ottignies-Louvain-la-Neuve" },
  { postalCode: "1348", city: "Louvain-la-Neuve" },
  { postalCode: "1380", city: "Lasne" },
  { postalCode: "1410", city: "Waterloo" },
  { postalCode: "1420", city: "Braine-l'Alleud" },
  { postalCode: "1435", city: "Mont-Saint-Guibert" },
  { postalCode: "1440", city: "Braine-le-Ch\u00E2teau" },
  { postalCode: "1460", city: "Ittre" },
  { postalCode: "1470", city: "Genappe" },
  { postalCode: "1500", city: "Halle" },
  { postalCode: "1540", city: "Herfelingen" },
  { postalCode: "1560", city: "Hoeilaart" },
  { postalCode: "1570", city: "Galmaarden" },
  { postalCode: "1600", city: "Sint-Pieters-Leeuw" },
  { postalCode: "1620", city: "Drogenbos" },
  { postalCode: "1630", city: "Linkebeek" },
  { postalCode: "1640", city: "Rhode-Saint-Gen\u00E8se / Sint-Genesius-Rode" },
  { postalCode: "1650", city: "Beersel" },
  { postalCode: "1651", city: "Lot" },
  { postalCode: "1652", city: "Alsemberg" },
  { postalCode: "1653", city: "Dworp" },
  { postalCode: "1700", city: "Dilbeek" },
  { postalCode: "1730", city: "Asse" },
  { postalCode: "1740", city: "Ternat" },
  { postalCode: "1750", city: "Lennik" },
  { postalCode: "1780", city: "Wemmel" },
  { postalCode: "1785", city: "Merchtem" },
  { postalCode: "1790", city: "Affligem" },
  { postalCode: "3000", city: "Leuven" },
  { postalCode: "3001", city: "Heverlee" },
  { postalCode: "3010", city: "Kessel-Lo" },
  { postalCode: "3012", city: "Wilsele" },
  { postalCode: "3020", city: "Herent" },
  { postalCode: "3080", city: "Tervuren" },
  { postalCode: "3090", city: "Overijse" },
];

/* -------------------------------------------------------------------------- */
/*  Combobox component                                                        */
/* -------------------------------------------------------------------------- */

function CityCombobox({
  value,
  onSelect,
  label,
  id,
}: {
  value: string;
  onSelect: (municipality: Municipality) => void;
  label: string;
  id: string;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Sync external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return MUNICIPALITIES.slice(0, 10);
    const q = query.toLowerCase();
    return MUNICIPALITIES.filter(
      (m) =>
        m.city.toLowerCase().includes(q) || m.postalCode.startsWith(q),
    ).slice(0, 8);
  }, [query]);

  return (
    <div ref={ref} className="relative">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={query}
        onChange={(e) => {
          setQuery((e.target as HTMLInputElement).value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
        role="combobox"
        aria-expanded={open && filtered.length > 0}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        className="mt-2"
      />
      {open && filtered.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 mt-1 w-full overflow-auto rounded-[var(--radius)] border border-border bg-popover p-1 shadow-[var(--shadow-lg)]"
          style={{ maxHeight: "15rem" }}
        >
          {filtered.map((m, i) => (
            <li
              key={`${m.postalCode}-${m.city}-${i}`}
              role="option"
              aria-selected={false}
              className="flex cursor-pointer items-center justify-between rounded-[calc(var(--radius)*0.6)] px-3 py-2 text-sm transition-colors hover:bg-muted"
              style={{ transitionDuration: "var(--duration-micro)" }}
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(m);
                setQuery(`${m.postalCode} ${m.city}`);
                setOpen(false);
              }}
            >
              <span className="font-medium">{m.city}</span>
              <span className="text-xs text-muted-foreground tabular-nums">
                {m.postalCode}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step Address                                                              */
/* -------------------------------------------------------------------------- */

export function StepAddress({ state, dict, onNext }: StepProps) {
  const [address, setAddress] = useState<Address>(state.address);

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({ ...prev, street: e.target.value }));
  };

  const handleCitySelect = (m: Municipality) => {
    setAddress((prev) => ({
      ...prev,
      city: m.city,
      postalCode: m.postalCode,
    }));
  };

  const isValid =
    address.street.trim() !== "" &&
    address.city.trim() !== "" &&
    address.postalCode.trim() !== "";

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">{dict.booking.address.title}</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address-street">{dict.booking.address.street}</Label>
          <Input
            id="address-street"
            name="street"
            value={address.street}
            onChange={handleStreetChange}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CityCombobox
            value={
              address.city
                ? `${address.postalCode} ${address.city}`
                : ""
            }
            onSelect={handleCitySelect}
            label={dict.booking.address.city}
            id="address-city"
          />
          <div className="space-y-2">
            <Label htmlFor="address-postalCode">
              {dict.booking.address.postalCode}
            </Label>
            <Input
              id="address-postalCode"
              name="postalCode"
              value={address.postalCode}
              readOnly
              tabIndex={-1}
              className="bg-muted/50"
              placeholder={"\u2190"}
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {dict.booking.address.note}
        </p>
      </div>

      <Button
        size="lg"
        className="w-full text-base font-bold"
        onClick={() => onNext({ address })}
        disabled={!isValid}
      >
        {dict.booking.next}
      </Button>
    </div>
  );
}
