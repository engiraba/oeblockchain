export function hashCode(str: {}): number {
    var hash = 0;
    for (var i = 0; i < str.toString().length; i++) {
        var character = str.toString().charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}