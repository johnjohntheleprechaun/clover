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
