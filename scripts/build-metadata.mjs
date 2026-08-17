import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const total = 1111;
const root = path.resolve(import.meta.dirname, "..");
const metadataDir = path.join(root, "metadata");
const imageBase = "https://raw.githubusercontent.com/tomzlabs/xianxia-cultivator-nft-1111/main/images";

const factions = ["Jade Sword Sect", "Thunder Pavilion", "Moon Talisman Hall", "Crane Cloud Court", "Vermilion Furnace", "Lotus Oracle House", "Frostpeak Order", "Spirit Beast Lodge"];
const paths = ["Sword Dao", "Talisman Dao", "Alchemy Dao", "Healer Dao", "Divination Dao", "Beast Dao", "Thunder Dao", "Frost Dao"];
const palettes = ["Jade", "Vermilion", "Indigo", "Celadon", "Amber", "Lilac", "Frost Blue", "Charcoal"];

await mkdir(metadataDir, { recursive: true });

for (let tokenId = 1; tokenId <= total; tokenId += 1) {
  const serial = String(tokenId).padStart(4, "0");
  const metadata = {
    name: `Xianxia Cultivator #${serial}`,
    description: "A square xianxia cultivation NFT profile portrait from the Xianxia Cultivator collection.",
    image: `${imageBase}/xianxia-${serial}.webp`,
    external_url: "https://github.com/tomzlabs/xianxia-cultivator-nft-1111",
    attributes: [
      { trait_type: "Faction", value: factions[(tokenId - 1) % factions.length] },
      { trait_type: "Cultivation Path", value: paths[(tokenId - 1) % paths.length] },
      { trait_type: "Palette", value: palettes[(tokenId - 1) % palettes.length] },
      { trait_type: "Edition", value: tokenId }
    ]
  };
  await writeFile(path.join(metadataDir, `${tokenId}.json`), `${JSON.stringify(metadata, null, 2)}\n`);
}

console.log(`Wrote ${total} metadata files to ${metadataDir}`);
