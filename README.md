RMWAD1-Project1
===============
### Extras
- Use of the [visitor pattern](http://en.wikipedia.org/wiki/Visitor_pattern) to implement the required multiple dispatch for collision detection between two arbitrary shapes.
* We didn't have time to actually implement multiple bounding shapes. However, using the visitor pattern allows us to easily add another shape which we want to collide with both circles and itself.
- A function whose sole purpose is to be `call`ed on objects to replicate a sort of trait/mixin construct, used to add shape-related properties and behavior to bumpers.
- [Immediate-invoked function expressions](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression) used both as namespaces and for the encapsulation of properties and methods within a "class".
- Used object URLs to allow the user to select an image from their file system and "paste" it into the drawing canvas.
- Used `ImageData` to get information about the pixels on the canvas.