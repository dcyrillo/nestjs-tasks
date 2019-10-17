class FriendsList {
  friends = [];
  addFriend(name) {
    this.friends.push(name);
    this.annouceFriendship(name);
  }

  annouceFriendship(name) {
    global.console.log('${name} is now friend ');
  }
  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx == -1) {
      throw new Error('friend not found!');
    }
    this.friends.splice(idx, 1);
  }
}

describe('FriendsList', () => {
  let friendsList;
  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('Initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Ariel');
    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.annouceFriendship = jest.fn();
    expect(friendsList.annouceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Ariel');
    expect(friendsList.annouceFriendship).toHaveBeenCalledWith('Ariel');
  });
  describe('removeFriend', () => {
    it('removes a friend from a list', () => {
      friendsList.addFriend('Ariel');
      expect(friendsList.friends[0]).toEqual('Ariel');
      friendsList.removeFriend('Ariel');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throws an error as friend does not exist', () => {
      expect(() => friendsList.removeFriend('Ariel')).toThrow(
        new Error('friend not found!'),
      );
    });
  });
});
