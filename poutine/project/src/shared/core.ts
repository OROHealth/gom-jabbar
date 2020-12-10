export interface Cardbox {
    mixed: boolean;
}
export interface Cheese {
    squeezed?: boolean;
}

export interface Lyrics {
    artist: string;
    text: string;
}
export interface Pot {
    temperature: number;
    content: any;
}

export interface Potatoe {
    boiled?: boolean;
    cut?: boolean;
    dipped?: boolean;
    dippingDuration?: number;
    fried?: boolean;
    oil?: string;
    sideLength?: number;
}

export type RobotName = 'bizar' | 'montroyashi' | 'nordo' | 'oldoporto' | 'outremona' | 'pierre' | 'verduny' | 'chef';

export interface Sauce {
    type: 'gravy';
}
