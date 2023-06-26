class Anime {

    constructor(id, nombre, genero, año, autor) {
        this._id = id;
        this._nombre = nombre;
        this._genero = genero;
        this._año = año;
        this._autor = autor;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    get genero() {
        return this._genero;
    }

    set genero(genero) {
        this._genero = genero;
    }

    get año() {
        return this._año;
    }

    set año(año) {
        this._año = año;
    }

    get autor() {
        return this._autor;
    }

    set autor(autor) {
        this._autor = autor;
    }
}

module.exports = Anime;