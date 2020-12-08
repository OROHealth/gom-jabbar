export type RobotName = 'bizar' | 'montroyashi' | 'nordo' | 'oldoporto' | 'outremona' | 'pierre' | 'verduny';

export interface Potatoe {
    boiled?: boolean;
    cut?: boolean;
    dipped?: boolean;
    dippingDuration?: number;
    fried?: boolean;
    oil?: string;
    sideLength?: number;
}

export interface Cheese {
    squeezed?: boolean;
}

export interface Sauce {
    type: 'gravy';
}

export interface Pot {
    temperature: number;
    content: any;
}

export interface Cardboard {
    mixed: boolean;
}
