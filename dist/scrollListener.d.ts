export declare type ScrollListener = (event: Event) => void;
export declare const scrollListener: {
    add(callback: ScrollListener): void;
    remove(callback: ScrollListener): void;
};
