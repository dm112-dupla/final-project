module.exports = class PixInfo{
    #defaultKey = "12312312312"
    #defaultName = "UtilityDM112"
    #defaultState = "Minas Gerais"
    
    getDefaultKey() {
        return this.#defaultKey;
    }
    getDefaultName() {
        return this.#defaultName;
    }
    getDefaultState() {
        return this.#defaultState;
    }
    getValue() {
        return this.value;
    }
    getDescription() {
        return this.description;
    }
    setKey(key) {
        this.key = key;
    }
    setName(name) {
        this.name = name;
    }
    setState(state) {
        this.state = state;
    }
    setValue(value) {
        this.value = value;
    }
    setDescription(description) {
        this.description = description;
    }
}