export interface Condition {
    price_min: number;
    price_max: number;
    offset: number;
    limit: number;
    categoryId?: number;
}