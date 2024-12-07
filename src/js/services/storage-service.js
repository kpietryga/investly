/**
 * StorageService provides a wrapper around localStorage for storing, retrieving,
 * and managing data in a structured manner using a Map. It allows for saving objects
 * with or without IDs, retrieving all items or keys, and clearing storage.
 */
export default class StorageService {
    /**
     * Constructor to initialize the storage service.
     * @param {string} key - The key used for localStorage to persist data.
     */
    constructor(key) {
        this.key = key;
        this.storageMap = new Map(Object.entries(JSON.parse(localStorage.getItem(this.key) || '{}')));
    }

    /**
     * Retrieves an object by its ID.
     * @param {string} id - The unique identifier of the object to retrieve.
     * @returns {Object|undefined} - The object associated with the given ID, or undefined if not found.
     */
    findOne(id) {
        return this.storageMap.get(id);
    }

    /**
     * Retrieves all stored objects.
     * @returns {Iterator<Object>} - An iterator of all stored objects.
     */
    findAll() {
        return this.storageMap.values();
    }

    /**
     * Retrieves all keys used in the storage map.
     * @returns {Iterator<string>} - An iterator of all keys.
     */
    getAllKeys() {
        return this.storageMap.keys();
    }

    /**
     * Saves a new object to storage with an auto-generated ID.
     * @param {Object} obj - The object to save. An `id` field will be added.
     */
    save(obj) {
        const id = Date.now().toString();
        obj["id"] = id;
        this.storageMap.set(id, obj);
        const toSave = this.#mapToObject(this.storageMap);
        localStorage.setItem(this.key, JSON.stringify(toSave));
    }

    /**
     * Saves an object to storage with a specified ID.
     * @param {string} id - The ID to associate with the object.
     * @param {Object} obj - The object to save.
     */
    saveWithId(id, obj) {
        this.storageMap.set(id, obj);
        const toSave = this.#mapToObject(this.storageMap);
        localStorage.setItem(this.key, JSON.stringify(toSave));
    }

    /**
     * Removes an object from storage by its ID.
     * @param {string} id - The ID of the object to remove.
     */
    remove(id) {
        this.storageMap.delete(id);
        const toSave = this.#mapToObject(this.storageMap);
        localStorage.setItem(this.key, JSON.stringify(toSave));
    }

    /**
     * Converts a Map to a plain object.
     * @private
     * @param {Map} map - The Map to convert.
     * @returns {Object} - The converted plain object.
     */
    #mapToObject(map) {
        return Object.fromEntries(map.entries());
    }

    /**
     * Clears all data from storage for the associated key.
     */
    clear() {
        this.storageMap.clear();
        localStorage.setItem(this.key, '{}');
    }
}