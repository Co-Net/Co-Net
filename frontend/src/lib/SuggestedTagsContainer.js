import React from "react";
import PropTypes from "prop-types";

class SuggestedTagsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
    };

    this.resultsRefs = {};
  }

  componentDidUpdate(prevProps) {
    const { currentRefinement, tags, hoveredTagIndex } = this.props;

    if (currentRefinement !== prevProps.currentRefinement) {
      this.setState({ isOpened: currentRefinement.trim() !== "" });
    }

    if (Object.keys(tags).length !== Object.keys(prevProps.tags).length) {
      this.setState({ isOpened: false });
    }

    if (hoveredTagIndex !== prevProps.hoveredTagIndex) {
      if (typeof this.resultsRefs[hoveredTagIndex] !== "undefined") {
        this.resultsRefs[hoveredTagIndex].scrollIntoView(false);
      }
    }
  }

  render() {
    const { isOpened } = this.state;
    const {
      currentRefinement,
      hits,
      onAddTag,
      hoveredTagIndex,
      suggestedTagComponent: SuggestedTagComponent,
      noResultComponent: NoResultComponent,
      friends,
      library,
      selectedGames
    } = this.props;

    if (!isOpened) {
      return false;
    }

    // If looking thru friends list in create message, filter out users who are not friends
    if (friends) {
      return (
        <div className="ais-SuggestedTagsBox">
          <ul className="ais-SuggestedTagsBox-list">
            {hits.map((hit, hitIdx) =>
              friends.some((x) => x.username === hit.username) ? (
                <li
                  key={hit.objectID}
                  ref={(instance) => (this.resultsRefs[hitIdx] = instance)}
                  className={`ais-SuggestedTagsBox-tag ${
                    hoveredTagIndex === hitIdx ? "hovered" : ""
                  }`}
                  onClick={() => onAddTag(hit, false)}
                >
                  <SuggestedTagComponent hit={hit} />
                </li>
              ) : (
                <li
                  key={hit.objectID}
                  ref={(instance) => (this.resultsRefs[hitIdx] = instance)}
                >
                </li>
              )
            )}

            {!hits.length && typeof NoResultComponent !== "undefined" && (
              <li
                className="ais-SuggestedTagsBox-tag hovered"
                onClick={() => onAddTag(currentRefinement, false)}
              >
                <NoResultComponent query={currentRefinement} />
              </li>
            )}
          </ul>
        </div>
      );
    } else if (library) {
      // Add Games section
      return (
        <div className="ais-SuggestedTagsBox">
          <ul className="ais-SuggestedTagsBox-list">
            {hits.map((hit, hitIdx) => (
              <li
                key={hit.objectID}
                ref={(instance) => (this.resultsRefs[hitIdx] = instance)}
                className={`ais-SuggestedTagsBox-tag ${
                  hoveredTagIndex === hitIdx ? "hovered" : ""
                }`}
                onClick={() => library.some(x => x.gameID === hit._id) || selectedGames.some(x => x === hit._id) ? null : onAddTag(hit, true)}
              >
                <SuggestedTagComponent exists={library.some(x => x.gameID === hit._id) || selectedGames.some(x => x === hit._id)} hit={hit} />
              </li>
            ))}

            {!hits.length && typeof NoResultComponent !== "undefined" && (
              <li
                className="ais-SuggestedTagsBox-tag hovered"
                onClick={() => onAddTag(currentRefinement, true)}
              >
                <NoResultComponent query={currentRefinement} />
              </li>
            )}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="ais-SuggestedTagsBox">
          <ul className="ais-SuggestedTagsBox-list">
            {hits.map((hit, hitIdx) => (
              <li
                key={hit.objectID}
                ref={(instance) => (this.resultsRefs[hitIdx] = instance)}
                className={`ais-SuggestedTagsBox-tag ${
                  hoveredTagIndex === hitIdx ? "hovered" : ""
                }`}
                onClick={() => onAddTag(hit, false)}
              >
                <SuggestedTagComponent hit={hit} />
              </li>
            ))}

            {!hits.length && typeof NoResultComponent !== "undefined" && (
              <li
                className="ais-SuggestedTagsBox-tag hovered"
                onClick={() => onAddTag(currentRefinement, false)}
              >
                <NoResultComponent query={currentRefinement} />
              </li>
            )}
          </ul>
        </div>
      );
    }
  }
}

SuggestedTagsContainer.propTypes = {
  tags: PropTypes.array.isRequired,
  onAddTag: PropTypes.func.isRequired,
  hoveredTagIndex: PropTypes.number.isRequired,
  suggestedTagComponent: PropTypes.func.isRequired,
};

export default SuggestedTagsContainer;
