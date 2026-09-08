export const supportedShapes = ['circle', 'square', 'triangle'];

export function Shape(type) {
    this.type = type;
    this.area = function() {
        let result = undefined;
        if(this.dimensions) {
            // TODO: Base the calculations on the dimensions
        }
        return result;
    }
    this.dimensions = undefined;

    this.assignDimensions = function(dimensions) {
        // Note: We'll accept the following
        // - `radius` for circles
        // - `length` for squares
        // - `base` and `height` for triangles 
        // TODO: Process the inputs; invalid inputs will result in an undefined set of dimensions and an error message.
    }
}
