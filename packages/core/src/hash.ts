import {createHash} from "crypto";

/**
 * Hashes at all levels, and adds a `hash` property to those nodes (in place)
 */
export function hashTree(node: any): Buffer {
    if (typeof node === "object" && node !== null) {
        const childHashes: Buffer[] = [];
        for (const key in node) {
            childHashes.push(hashTree(node[key]));
        }

        const combined = Buffer.concat(childHashes);
        const hash = createHash("sha256").update(combined).digest();
        node.hash = hash.toString("hex");
        return hash;
    }
    else {
        return createHash("sha256").update(toBuffer(node)).digest();
    }
}

function toBuffer(data: any): Buffer {
    return Buffer.from(`${typeof data}:${data}`);
}
