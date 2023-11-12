import { createSignal } from './signal';

function testSignals(): void {
    const {getter: points, setter: setPoints} = createSignal(42);
    
    // TEMP: should print 42
    console.log(points());
    
    setPoints(points() + 5);
    
    // TEMP: should print 47
    console.log(points());

}

testSignals();