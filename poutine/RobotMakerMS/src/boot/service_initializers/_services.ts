import { logger } from "../../utils";
import {
    outremonaController,
    verdunyController,
    nordoController,
    bizarController,
    montroyashiController,
    oldoportoController,
    pierreController,
} from "../../controllers";
import {
    Outremona,
    Verduny,
    Nordo,
    Bizar,
    Montroyashi,
    Oldoporto,
    Pierre
} from "../../services";
/*
* On successful initialization invoke resolve
* Resolve will trigger next initializer
*
* On fail initialization you can invoke reject
* Reject will stop the booting up of express app. In case you don't want to stop booting process if initialization fails invoke resolve
 */

async function registerConsumer(robot, robotController) {
    const robotInstance = await robot.getInstance();
    robotInstance.registerConsumer(robotController);
}

const init = async function (): Promise<void> {
    try {
        // do your initialization here
        logger.info("BOOT :: booting services...");
        await registerConsumer(Outremona, outremonaController);
        await registerConsumer(Verduny, verdunyController);
        await registerConsumer(Nordo, nordoController);
        await registerConsumer(Bizar, bizarController);
        await registerConsumer(Montroyashi, montroyashiController);
        await registerConsumer(Oldoporto, oldoportoController);
        await registerConsumer(Pierre, pierreController);
        const montroyashiDrunk = await Montroyashi.getDrunkHandlerInstance();
        montroyashiDrunk.registerConsumer(montroyashiController);
        logger.info("BOOT :: all services booted...");
    }  catch (err) {
        console.error(err);
        logger.error(`BOOT :: Error initializing one of the services {data} : ${JSON.stringify(err.message)}`);
        throw  new Error(err.message);
    }
};

export default init;







