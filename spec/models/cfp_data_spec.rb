require "rails_helper"

# Specs load CFPs from spec/data. This checks the real config/data/cfps.yml,
# since FrozenRecord only defines attributes for keys present in the file.
RSpec.describe "config/data/cfps.yml" do
  around do |example|
    original_path = CFP.base_path
    CFP.base_path = Rails.root.join("config/data")
    CFP.unload!
    example.run
  ensure
    CFP.base_path = original_path
    CFP.unload!
  end

  it "has exactly one primary CFP" do
    expect(CFP.where(primary: true).count).to eq(1)
  end

  it "serializes every CFP" do
    CFP.all.to_a.each do |cfp|
      expect { CFPSerializer.new(cfp).serialize }.not_to raise_error
    end
  end

  describe "CFP 2027" do
    subject(:cfp) { CFP.primary }

    it "is the primary CFP" do
      expect(cfp.id).to eq("primary-2027")
    end

    it "keeps 2026 inactive" do
      expect(CFP.find("primary").inactive).to be(true)
      expect(CFP.active.map(&:id)).to eq(["primary-2027"])
    end

    it "accepts only the general track" do
      expect(cfp.tracks.keys).to eq(["general"])
    end

    it "is open on the last day, December 22, 2026, São Paulo time" do
      travel_to Time.find_zone!("America/Sao_Paulo").parse("2026-12-22 23:59:59")
      expect(cfp).not_to be_future
      expect(cfp).not_to be_closed
    end

    it "is open right now (November 2026)" do
      travel_to Time.find_zone!("America/Sao_Paulo").parse("2026-11-09 09:00")
      expect(cfp).not_to be_closed
    end

    it "is closed once December 22, 2026 ends, São Paulo time" do
      travel_to Time.find_zone!("America/Sao_Paulo").parse("2026-12-23 00:00:01")
      expect(cfp).to be_closed
    end
  end
end
