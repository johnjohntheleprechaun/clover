import {parse} from "@babel/parser";
import {hashTree} from "./hash";
import {cloneDeepWithoutLoc} from "@babel/types";

/**
 * Load a program and hash the AST.
 *
 * @argument code The code to parse.
 * @returns The AST with hashes set
 */
export function loadProgram(code: string): any {
    const parsed = parse(code);
    const sansLoc = cloneDeepWithoutLoc(parsed);

    hashTree(sansLoc);
    return sansLoc;
}

export function getNodeByIdentifier(identifier: string, node: any) {
    if (identifier === "") {
        return node;
    }
    const identifiers = identifier.split(".");

    if (typeof node === "object" && node !== null) {
        const keysToCheck = [];
        for (const key in node) {
            if (typeof node[key] === "object" && node[key] !== null && node[key].type === "Identifier" && node[key].name === identifiers[0]) {
                return getNodeByIdentifier(identifiers.slice(1).join("."), node);
            }
            else if (typeof node[key] === "object" && node[key] !== null) {
                keysToCheck.push(key);
            }
        }

        for (const key of keysToCheck) {
            const result: any = getNodeByIdentifier(identifiers.join("."), node[key]);
            if (result !== undefined) {
                return result
            }
        }
    }
    return undefined;
}
