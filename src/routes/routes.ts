import { HealthController } from "../controllers/health-controller";
import { LoggerContainer } from "../settings/logger";
import { UserController } from "../controllers/user-controller";
import { ProductController } from "../controllers/product-controller";
import { OrderController } from "../controllers/order-controller";
import { adminVerify, verify } from "../middleware/verifyToken";

const userController = new UserController();
const productController = new ProductController();
const orderController = new OrderController();
const logger = LoggerContainer.instance.getLogger("Router");
const healthController = new HealthController();

export function attachApplicationRoutes(app) {
    app.use((req, res, next) => {
        logger.debug(`Processing route: ${req.url}`);
        next();
    });
    app.get("/health", healthController.getStatus);

    // User Controller
    app.post("/api/user/register", userController.register);
    app.post("/api/user/login", userController.login);

    // Product Controller
    app.post("/api/product/create", adminVerify, productController.create);
    app.get("/api/product/list", verify, productController.getAll);

    // Order Controller
    app.post("/api/order/create", verify, orderController.create);
    app.get("/api/order/list", verify, orderController.getOrderByUser);
    app.get("/api/order/admin/list", adminVerify, orderController.getAllOrders);


}
