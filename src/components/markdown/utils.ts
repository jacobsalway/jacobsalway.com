import type { ReactNode } from 'react'
import { Children, isValidElement } from 'react'

// code snippet coppied from the react-children-utilities library
// https://github.com/fernandopasik/react-children-utilities/blob/e0f5e99878714b7ce86ef4d7c5e76c0ad2f8d222/src/lib/onlyText.ts

const hasChildren = (
    element: ReactNode
): element is React.ReactElement<{ children: ReactNode | ReactNode[] }> =>
    isValidElement<{ children?: ReactNode[] }>(element) &&
    Boolean(element.props.children)

const childToString = (child?: ReactNode): string => {
    if (
        typeof child === 'undefined' ||
        child === null ||
        typeof child === 'boolean'
    ) {
        return ''
    }

    if (JSON.stringify(child) === '{}') {
        return ''
    }

    return (child as number | string).toString()
}

export const onlyText = (children: ReactNode | ReactNode[]): string => {
    if (!(children instanceof Array) && !isValidElement(children)) {
        return childToString(children)
    }

    return Children.toArray(children).reduce(
        (text: string, child: ReactNode): string => {
            let newText = ''

            if (isValidElement(child) && hasChildren(child)) {
                newText = onlyText(child.props.children)
            } else if (isValidElement(child) && !hasChildren(child)) {
                newText = ''
            } else {
                newText = childToString(child)
            }

            return text.concat(newText)
        },
        ''
    )
}
