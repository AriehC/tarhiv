"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
// @ts-expect-error -- react-simple-maps has no published types
} from "react-simple-maps";
import { cn } from "@/lib/utils";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO alpha-3 to numeric mapping for choropleth matching
const ISO_A3_TO_NUM: Record<string, string> = {
  ISR: "376", USA: "840", FRA: "250", CAN: "124", GBR: "826",
  ARG: "032", RUS: "643", DEU: "276", AUS: "036", BRA: "076",
  ZAF: "710", UKR: "804", HUN: "348", MEX: "484", BEL: "056",
  ITA: "380", NLD: "528", CHE: "756", CHL: "152", URY: "858",
  TUR: "792", SWE: "752", ESP: "724", PAN: "591", AUT: "040",
  COL: "170", NZL: "554", IND: "356", MAR: "504", DNK: "208",
  POL: "616", JPN: "392", CHN: "156", KOR: "410", EGY: "818",
  ETH: "231", IRN: "364", IRQ: "368", LBN: "422", SYR: "760",
};

interface MapDataPoint {
  id: string;
  name: string;
  nameEn?: string;
  value?: number;
  coordinates?: [number, number];
  color?: string;
}

interface InteractiveMapProps {
  mapType: "world" | "israel";
  data: MapDataPoint[];
  colorScale?: [string, string];
  showLegend?: boolean;
  title?: string;
  height?: number;
  tooltipTemplate?: string;
  markerSize?: number;
}

function interpolateColor(
  color1: string,
  color2: string,
  factor: number,
): string {
  const hex = (c: string) => parseInt(c, 16);
  const r1 = hex(color1.slice(1, 3));
  const g1 = hex(color1.slice(3, 5));
  const b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3));
  const g2 = hex(color2.slice(3, 5));
  const b2 = hex(color2.slice(5, 7));
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

function InteractiveMap({
  mapType,
  data,
  colorScale = ["#dbeafe", "#1d4ed8"],
  showLegend = true,
  title,
  height = 400,
  tooltipTemplate,
  markerSize = 8,
}: InteractiveMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [tooltip, setTooltip] = useState<{
    content: string;
    x: number;
    y: number;
  } | null>(null);

  const valueExtent = useMemo(() => {
    const values = data
      .filter((d) => d.value != null)
      .map((d) => d.value as number);
    if (values.length === 0) return [0, 1] as [number, number];
    return [Math.min(...values), Math.max(...values)] as [number, number];
  }, [data]);

  const dataById = useMemo(() => {
    const map = new Map<string, MapDataPoint>();
    data.forEach((d) => {
      map.set(d.id, d);
      // Also map by numeric ISO code if the id is an alpha-3 code
      const numericId = ISO_A3_TO_NUM[d.id];
      if (numericId) map.set(numericId, d);
    });
    return map;
  }, [data]);

  const markerData = useMemo(
    () => data.filter((d) => d.coordinates != null),
    [data],
  );

  const choroplethData = useMemo(
    () => data.filter((d) => d.value != null && !d.coordinates),
    [data],
  );

  const getColor = (value: number) => {
    const [min, max] = valueExtent;
    const range = max - min;
    const factor = range === 0 ? 0.5 : (value - min) / range;
    return interpolateColor(colorScale[0], colorScale[1], factor);
  };

  const formatTooltip = (point: MapDataPoint) => {
    if (tooltipTemplate) {
      return tooltipTemplate
        .replace("{name}", point.name)
        .replace("{value}", String(point.value ?? ""));
    }
    return point.value != null
      ? `${point.name}: ${point.value.toLocaleString()}`
      : point.name;
  };

  const mapConfig =
    mapType === "israel"
      ? { center: [35, 31.5] as [number, number], zoom: 1, scale: 6000 }
      : { center: [0, 20] as [number, number], zoom: 1, scale: 150 };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "my-8 rounded-2xl border border-surface-200 bg-surface-0 p-5",
        "shadow-sm",
      )}
    >
      {title && (
        <h3 className="mb-4 font-heading text-lg font-bold text-text-primary">
          {title}
        </h3>
      )}

      <div className="relative" style={{ height }}>
        {isInView && (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: mapConfig.center,
              scale: mapConfig.scale,
            }}
            width={800}
            height={height}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup zoom={mapConfig.zoom} center={mapConfig.center}>
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: Array<Record<string, any>> }) =>
                  geographies.map((geo: Record<string, any>) => {
                    const geoId = geo.properties.name;
                    const numericId = String(geo.id);
                    const point =
                      dataById.get(geoId) || dataById.get(numericId);
                    const fillColor =
                      point?.value != null
                        ? getColor(point.value)
                        : "var(--surface-200)";

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke="var(--surface-100)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            outline: "none",
                            fill: point
                              ? interpolateColor(
                                  fillColor,
                                  "#000000",
                                  0.15,
                                )
                              : "var(--surface-200)",
                            cursor: point ? "pointer" : "default",
                          },
                          pressed: { outline: "none" },
                        }}
                        onMouseEnter={(evt: React.MouseEvent) => {
                          if (point) {
                            const rect = ref.current?.getBoundingClientRect();
                            setTooltip({
                              content: formatTooltip(point),
                              x: evt.clientX - (rect?.left ?? 0),
                              y: evt.clientY - (rect?.top ?? 0) - 10,
                            });
                          }
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })
                }
              </Geographies>

              {markerData.map((point) => (
                <Marker
                  key={point.id}
                  coordinates={point.coordinates!}
                  onMouseEnter={(evt: React.MouseEvent) => {
                    const rect = ref.current?.getBoundingClientRect();
                    setTooltip({
                      content: formatTooltip(point),
                      x: evt.clientX - (rect?.left ?? 0),
                      y: evt.clientY - (rect?.top ?? 0) - 10,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <circle
                    r={markerSize / mapConfig.zoom}
                    fill={point.color ?? colorScale[1]}
                    stroke="#fff"
                    strokeWidth={1.5 / mapConfig.zoom}
                    opacity={0.85}
                    style={{ cursor: "pointer" }}
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        )}

        {tooltip && (
          <div
            className={cn(
              "pointer-events-none absolute z-10 rounded-lg",
              "border border-surface-200 bg-surface-0 px-3 py-1.5",
              "text-sm font-medium text-text-primary shadow-lg",
            )}
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>

      {showLegend && choroplethData.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-text-muted">
          <span>{valueExtent[0].toLocaleString()}</span>
          <div
            className="h-3 w-32 rounded-full"
            style={{
              background: `linear-gradient(to left, ${colorScale[1]}, ${colorScale[0]})`,
            }}
          />
          <span>{valueExtent[1].toLocaleString()}</span>
        </div>
      )}
    </motion.div>
  );
}

export { InteractiveMap, type InteractiveMapProps, type MapDataPoint };
