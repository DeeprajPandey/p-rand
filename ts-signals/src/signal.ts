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
export function createSignal(payload: TPayload): ISignal & {sub: (agent: ISubscriber) => boolean, unsub: (agent: ISubscriber) => boolean} {
    let data: TPayload = payload;
    let observers: ISubscriber[] = [];

    const getter = () => data;
    const setter = (pl: TPayload) => {
        data = pl;
        // TODO: notify subscribers
    }

    const sub = (agent: ISubscriber): boolean => {
        if (!observers.includes(agent)) {
            observers.push(agent);
            // DEBUG
            console.dir(observers);
            return true;
        }
        return false;
    }
    const unsub = (agent: ISubscriber): boolean => {
        const index = observers.indexOf(agent);
        if (index !== -1) {
            observers.splice(index, 1);
            // DEBUG
            console.dir(observers);
            return true;
        }

        return false;
    }

    return {
        getter,
        setter,
        sub,
        unsub
    };
}

export function createSubscriber(agentFn: () => any): ISubscriber {
    const agent = {
        update: agentFn
    };

    return agent;
}
