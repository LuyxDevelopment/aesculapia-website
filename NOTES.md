# Frontend contribution guide

### This is a basic guide on how to write frontend code in react.

# Basic structure of a react component

_If you need more explanation on a certain topic, please refer to the react/nextJS docs or DM me at decc00n#6684_

```jsx
import { FC } from 'react';

interface Props {
	hello: string;
}

const Component: FC<{ props: Props }> = ({ props }) => {
	// hooks, could be state or effect, etc.

	// rendering
	return <div>hello {props.hello}</div>;
};

export default Component;
```

# Basic structure of a NextJS page

```jsx
import { NextPage } from 'next';

interface Props {
	hello: string;
}

const Component: NextPage<{ props: Props }> = ({ props }) => {
	// hooks, could be state or effect, etc.

	// rendering
	return <div>hello {props.hello}</div>;
};

export default Component;
```

As you can see there isn't much difference between react hooks and next pages, the only difference is about getting props, so for example:

**In a react component**:

```jsx
return <Component props={{ hello: 'world' }} />;
```

**In a NextJS page**:

```jsx
import { NextPage } from "next";

interface Props {
    hello: string
}

const Component: NextPage<{ data: Props}> = ({ props }) => {
    // hooks, could be state or effect, etc.

    // rendering
    return (
        <div>
            hello {props.hello}
        </div>
    )
}

export default function getServerSideProps() {
    return (
        props: {
            data: { hello: "world" }
        }
    )
}

export default Component
```

In NextJS the data is being retrieved from the server and the component is also rendered on the server (meaning, before the page is loaded, the data that the page needs will be loaded first).

# Utilities

## Conditional rendering

Sometimes, when you want to render a component/elment, you need to fulfill a condition:

```js
    // basic component/page
    return (
        {/* ... elements */}
        {conditon && (
            <Component /> {/* ... or a simple div */}
        )}
    )
```

# State

The only things you need to know about state:

1. State is immutable when you aren't using the SetState function (meaning if you have a state such as `count` you can't just do `count++` to update it).

2. State triggers component re-render (as to my humble knowledge)

3. The useState hook takes a default value and can be typed.

## Example

```jsx
// import useState hook
import { FC, useState } from 'react';

const Component: FC = () => {
	// set the actual state
	const [count, setCount] = useState < number > 0; // 0 being the default value

	// rendering
	return (
		<div>
			<h1>You have clicked {count} time(s)</h1>
			<button onClick={setCount(count + 1)}>Increment</button>
		</div>
	);
};

export default Component;
```

Now every time you click the button, the component re-renders (it "reacts") and shows the new value of `count`

States can be anything: string, booleans, numbers, arrays, objects, etc...

# Effects

Effects are generally used to do something before page load, or to react to state, lets say whenever the count increments, we want to console log a message

```jsx
// import useState and useEffect hook

import { FC, useState, useEffect } from 'react';

const Component: FC = () => {
	// set the actual state
	const [count, setCount] = useState < number > 0; // 0 being the default value

	// useEffect hook
	// takes a callback function and a dependency array, we'll talk about it later on
	useEffect(() => {
		console.log(
			`${count - 1} + 1 is ${count} - 1 thats ${count - 1} quick maths!`,
		);
	}, [count]); // whenever count changes, useEffect runs

	// rendering
	return (
		<div>
			<h1>You have clicked {count} time(s)</h1>
			<button onClick={setCount(count + 1)}>Increment</button>
		</div>
	);
};

export default Component;
```
