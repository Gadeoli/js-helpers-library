/**
 * Recieve a array of string | undefined and return a valid and clean string css className
 */
export const handleCssClassnames : (classNames:  Array<string|undefined>) => string = (classNames) => {
    return  classNames.length ? 
            classNames.filter(c => c !== undefined).join(' ') : 
            '';
}