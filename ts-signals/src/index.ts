import { createSignal, createSubscriber } from './signal';

function testSignals(): void {
    const {getter: points, setter: setPoints} = createSignal(42);

    const logger = createSubscriber(() => {
        console.log(`\n>> Received notification: ${points()}\n`);
    });


    // TEMP: should print 42
    console.log(points());
    
    if (points.sub(logger)) {
        console.info("Logger sub'd to points");
    } else {
        console.error(`${logger} (logger) could not subscribe to (points) ${points}`);
    }

    // update to 47 and emit to subscribers, logger should print 47
    setPoints(points() + 5);

    if (points.unsub(logger)) {
        console.info("Logger unsub'd from points");
    } else {
        console.error(`${logger} (logger) could not unsubscribe from (points) ${points}`);
    }

    // TEMP: should print 47
    console.log(points());

}

testSignals();