import { createSignal, createSubscriber } from './signal';

function testSignals(): void {
    const {getter: points, setter: setPoints, sub, unsub} = createSignal(42);

    const logger = createSubscriber(() => {
        console.log(points());
    });

    
    // TEMP: should print 42
    console.log(points());
    
    setPoints(points() + 5);
    
    // TEMP: should print 47
    console.log(points());

}

testSignals();