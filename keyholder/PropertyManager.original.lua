--[[
	This script handles all the server side events with the homes.
--]]
local homes = workspace:WaitForChild("Homes", 5);
local ManageProperty = game:GetService("ReplicatedStorage"):WaitForChild("ManageProperty", 5);

local function check()
	if not homes then
		warn("HomeCore: 'Homes' folder is not in Workspace, therefore the Buyable Home system cannot work.");
		script.Disabled = true;
	end
	if not ManageProperty then
		warn("HomeCore: 'ManageProperty' event is not in ReplicatedStorage, therefore the Buyable Home system cannot work.");
		script.Disabled = true;
	end
end
check();

local function getProperty(player)
	for each, home in pairs(workspace.Homes:GetChildren()) do
		if home.Settings.Owner.Value == player.Name then
			return home;
		end
	end
	return nil;
end

local function toggleDoors(toggle, property)
	if toggle == "open" then
		for each, door in pairs(property.Core.Doors:GetChildren()) do
			door.CanCollide = false;
			door.Transparency = 1;
		end
		property.Settings.Unlocked.Value = true;
	elseif toggle == "close" then
		for each, door in pairs(property.Core.Doors:GetChildren()) do
			door.CanCollide = true;
			door.Transparency = 0;
		end
		property.Settings.Unlocked.Value = false;
	end
end
	
local function toggleLights(toggle, property)
	if toggle == "on" then
		for each, light in pairs(property.Core.Lights:GetChildren()) do
			light.LampFixture.SpotLight.Enabled = true;
			light.LampFixture.BrickColor = BrickColor.new("Institutional white");
			light.LampFixture.Material = "Neon";
		end
		property.Settings.Brightened.Value = true;
	elseif toggle == "off" then
		for each, light in pairs(property.Core.Lights:GetChildren()) do
			light.LampFixture.SpotLight.Enabled = false;
			light.LampFixture.BrickColor = BrickColor.new("Black");
			light.LampFixture.Material = "Plastic";
		end
		property.Settings.Brightened.Value = false;
	end
end
	
local function toggleCurtains(toggle, property)
	if toggle == "down" then
		for each, curtain in pairs(property.Core.Windows.Curtains:GetChildren()) do
			if curtain.Name == "Blocker" then
				curtain.Transparency = 0;
				curtain.CanCollide = true;
			elseif curtain.Name == "Curtain" then
				curtain.Transparency = 1;
				curtain.CanCollide = false;
			end
		end
		property.Settings.Privacy.Value = true;
	elseif toggle == "up" then
		for each, curtain in pairs(property.Core.Windows.Curtains:GetChildren()) do
			if curtain.Name == "Blocker" then
				curtain.Transparency = 1;
				curtain.CanCollide = false;
			elseif curtain.Name == "Curtain" then
				curtain.Transparency = 0;
				curtain.CanCollide = true;
			end
		end
		property.Settings.Privacy.Value = false;
	end
end

local function changeColor(newColor, property)
	for each, wall in pairs(property.Core.Walls:GetChildren()) do
		wall.Color = newColor;
	end
end

ManageProperty.OnServerEvent:Connect(function(player, action, property, newColor)
	if player and action and property then --Making sure we're not playing around with with ghosts!
		if action == "Sell" then --If the player wishes to sell their property
			player.leaderstats.Money.Value = player.leaderstats.Money.Value + math.floor(property.Settings.Price.Value/2);
			property.Settings.Owner.Value = "";
			property.Core.OwnerSign.SurfaceGui.OwnerText.Text = "Unowned!";
			toggleDoors("close", property); --Lock the doors to prevent trespassors.
			toggleLights("off", property); --Turn the lights off to save electricity.
			toggleCurtains("up", property); --Raise the curtains to let new buyers view the property.
			
			for each, part in pairs(property.Core.BuySign:GetChildren()) do --Put the buy sign back up
				part.Transparency = 0;
				part.CanCollide = true;
				if part.Name == "Sign" then
					part.SurfaceGui.Enabled = true;
					part.ClickDetector.MaxActivationDistance = 15;
				end
			end
			
			for each, placeable in pairs(workspace.Placeables:GetChildren()) do --Remove anything the player put in the house
				if placeable.Owner.Value == player.Name then
					placeable:Destroy();
				end
			end
			
			for each, door in pairs(property.Core.Doors:GetChildren()) do
				door.BreakIn.Disabled = true;
				door.SurfaceGui.Frame.Visible = false;
				door.SurfaceGui2.Frame.Visible = false;
			end
		elseif action == "Color" then --If the player wishes to change the color of their house
			changeColor(newColor, property); --Change the color
		elseif action == "OpenDoors" then --If the player wishes to unlock their doors
			toggleDoors("open", property); --Unlock the doors
		elseif action == "CloseDoors" then --If the player wishes to lock their doors
			toggleDoors("close", property); --Lock the doors
		elseif action == "LightsOn" then --If the player wishes to turn their lights on
			toggleLights("on", property); --Turn the lights on
		elseif action == "LightsOff" then --If the player wishes to turn their lights off
			toggleLights("off", property); --Turn the lights off
		elseif action == "CurtainsDown" then --If the player wishes to bring down their curtains
			toggleCurtains("down", property); --Bring down their curtains
		elseif action == "CurtainsUp" then --If the player wishes to bring up their curtains
			toggleCurtains("up", property); --Bring up their curtains
		end
	end
end)

game.Players.PlayerRemoving:Connect(function(player)
	local property = getProperty(player);
	if property then
		property.Settings.Owner.Value = "";
		property.Core.OwnerSign.SurfaceGui.OwnerText.Text = "Unowned!";
		toggleDoors("close", property); --Lock the doors to prevent trespassors.
		toggleLights("off", property); --Turn the lights off to save electricity.
		toggleCurtains("up", property); --Raise the curtains to let new buyers view the property.
		
		for each, part in pairs(property.Core.BuySign:GetChildren()) do --Put the buy sign back up
			part.Transparency = 0;
			part.CanCollide = true;
			if part.Name == "Sign" then
				part.SurfaceGui.Enabled = true;
				part.ClickDetector.MaxActivationDistance = 15;
			end
		end
				
		for each, placeable in pairs(workspace.Placeables:GetChildren()) do --Remove anything the player put in the house
			if placeable.Owner.Value == player.Name then
				placeable:Destroy();
			end
		end
		
		for each, door in pairs(property.Core.Doors:GetChildren()) do
			door.BreakIn.Disabled = true;
			door.SurfaceGui.Frame.Visible = false;
			door.SurfaceGui2.Frame.Visible = false;
		end
	end
end)