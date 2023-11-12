// TODO: set up signal stack: w/ signals and effects

// Catchall type for the callbacks which will be added to signal stack
type TUpdateMethod = () => void;
// TODO: update number with a generic type to cover most data types
type TPayload = number;

interface ISubscriber {
    update: TUpdateMethod;
}

interface ISignal {
    getter: () => TPayload;
    setter: (payload: TPayload) => void;
}

// Signal is essentially an observer subject with methods to update state + sub and unsub
export function createSignal(payload: TPayload): ISignal {
    let data: TPayload = payload;

    const getter = () => data;
    const setter = (pl: TPayload) => {
        data = pl;
        // TODO: notify subscribers
    }

    return {
        getter,
        setter
    };
}
