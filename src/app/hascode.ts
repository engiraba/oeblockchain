import { sha256 } from "js-sha256";

export function hashCode(str: {}): string {
    let hash : string = '';
    hash = sha256(str.toString());
    return hash;
}