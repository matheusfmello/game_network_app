#!/bin/bash

# Check if component name is provided
if [ -z "$1" ]; then
  echo "Component name is required."
  echo "Usage: bash create_component.sh component_name"
  exit 1
fi

# Capture the original component name (as folder name) and convert it to CamelCase for file names
FOLDER_NAME="$1"
COMPONENT_NAME=$(echo "$1" | sed -r 's/(^|_)([a-z])/\U\2/g')

# Create the component directory
COMPONENT_DIR="./client/src/components/$FOLDER_NAME"
mkdir -p "$COMPONENT_DIR"

# Create the CamelCase.js file
JS_FILE="$COMPONENT_DIR/$COMPONENT_NAME.js"
cat <<EOL > "$JS_FILE"
import React from 'react';
import './$COMPONENT_NAME.css';

const $COMPONENT_NAME = () => {
  return (
    <div className="$COMPONENT_NAME">
      {/* Your component code goes here */}
    </div>
  );
};

export default $COMPONENT_NAME;
EOL

# Create the CamelCase.css file
CSS_FILE="$COMPONENT_DIR/$COMPONENT_NAME.css"
cat <<EOL > "$CSS_FILE"
.$COMPONENT_NAME {
  /* Your styles go here */
}
EOL

echo "Component $COMPONENT_NAME created successfully in $FOLDER_NAME folder!"
